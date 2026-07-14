"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, Send, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does ReVolt Energy do?",
  "How can I partner or host a node?",
  "What is modular BESS?",
  "How do I contact investor relations?",
];

/**
 * On-site AI text chat agent.
 * LLM: SpaceXAI/xAI when XAI_API_KEY is set; else local site knowledge.
 */
export function AgentWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi — I'm the ReVolt site assistant. Ask about BESS, partners, investors, solutions, or how to get in touch.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;

      const userMsg: Msg = {
        id: `u-${Date.now()}`,
        role: "user",
        content: text,
      };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const history = [...messages, userMsg]
          .filter((m) => m.id !== "welcome")
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/agent/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, message: text }),
        });
        const data = (await res.json()) as {
          reply?: string;
          source?: string;
        };
        const reply =
          data.reply ||
          "Sorry — I couldn't answer that. Try the contact form.";
        setSource(data.source ?? null);
        setMessages((m) => [
          ...m,
          { id: `a-${Date.now()}`, role: "assistant", content: reply },
        ]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content:
              "Connection issue. Please try again or visit /contact.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages],
  );

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition",
          "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))]",
          "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
          "hover:shadow-[0_0_32px_rgba(16,185,129,0.45)]",
          open && "ring-2 ring-emerald-300/50",
        )}
        aria-label={open ? "Close assistant" : "Open ReVolt assistant"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed z-[60] flex flex-col overflow-hidden rounded-3xl border border-emerald-500/25 bg-[#0a120f]/95 shadow-2xl backdrop-blur-xl",
              /* Mobile: near full-width panel above the FAB; desktop: compact card */
              "inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] sm:inset-x-auto sm:right-[max(1.25rem,env(safe-area-inset-right))] sm:left-auto sm:w-[min(100vw-1.5rem,400px)]",
            )}
            style={{
              height: "min(70dvh, 560px)",
              maxHeight: "calc(100dvh - 8rem - env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-emerald-950/50 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/40">
                <Bot className="h-4 w-4 text-emerald-300" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  ReVolt Assistant
                </p>
                <p className="text-[10px] text-emerald-400/80">
                  {source === "xai"
                    ? "Powered by site LLM"
                    : source === "local" || source === "local-fallback"
                      ? "Site knowledge mode"
                      : "Text chat"}
                </p>
              </div>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3 [-webkit-overflow-scrolling:touch]"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "ml-auto bg-emerald-600 text-white"
                      : "mr-auto border border-white/10 bg-white/5 text-gray-100",
                  )}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-emerald-300">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Thinking…
                </div>
              )}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-left text-[11px] text-emerald-200 hover:bg-emerald-500/20"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-black/30 p-3">
              <form
                className="flex items-end gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask about ReVolt…"
                  enterKeyHint="send"
                  className="max-h-28 min-h-12 flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-base text-white outline-none placeholder:text-gray-500 focus:border-emerald-500/40 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-navy-950 transition hover:bg-emerald-400 disabled:opacity-40"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
