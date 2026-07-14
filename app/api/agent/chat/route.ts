import { NextResponse } from "next/server";
import { AGENT_SYSTEM_PROMPT, localAgentAnswer } from "@/lib/agent-knowledge";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      messages?: ChatMessage[];
      message?: string;
    };

    const messages = body.messages ?? [];
    const lastUser =
      body.message?.trim() ||
      [...messages].reverse().find((m) => m.role === "user")?.content?.trim();

    if (!lastUser) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.XAI_API_KEY;

    // Internal LLM via SpaceXAI / xAI when key is present
    if (apiKey) {
      const history = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.XAI_MODEL || "grok-4-1-fast-non-reasoning",
          temperature: 0.4,
          messages: [
            { role: "system", content: AGENT_SYSTEM_PROMPT },
            ...history,
            // Ensure latest user turn is present even if client only sent message
            ...(history.some(
              (m) => m.role === "user" && m.content === lastUser,
            )
              ? []
              : [{ role: "user" as const, content: lastUser }]),
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("[agent] xAI error", res.status, errText);
        // Graceful fallback
        return NextResponse.json({
          reply: localAgentAnswer(lastUser),
          source: "local-fallback",
          warning: "LLM unavailable; used site knowledge matcher.",
        });
      }

      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const reply =
        data.choices?.[0]?.message?.content?.trim() ||
        localAgentAnswer(lastUser);

      return NextResponse.json({
        reply,
        source: "xai",
      });
    }

    // No API key: fully local knowledge-based answers
    return NextResponse.json({
      reply: localAgentAnswer(lastUser),
      source: "local",
    });
  } catch (e) {
    console.error("[agent]", e);
    return NextResponse.json(
      { error: "Agent failed", reply: localAgentAnswer("help") },
      { status: 500 },
    );
  }
}
