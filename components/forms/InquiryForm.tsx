"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { inquirySteps, partnerTypes } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { EnergyBar } from "@/components/ui/EnergyBar";
import { cn } from "@/lib/cn";

type Path = "partner" | "investor" | "general";

type FormState = {
  path: Path;
  name: string;
  email: string;
  organisation: string;
  role: string;
  siteType: string;
  location: string;
  capacity: string;
  capitalRange: string;
  message: string;
};

const initial: FormState = {
  path: "partner",
  name: "",
  email: "",
  organisation: "",
  role: "",
  siteType: "",
  location: "",
  capacity: "",
  capitalRange: "",
  message: "",
};

export function InquiryForm() {
  const params = useSearchParams();
  const initialPath = (params.get("path") as Path) || "partner";
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>({
    ...initial,
    path: ["partner", "investor", "general"].includes(initialPath)
      ? initialPath
      : "partner",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const progress = useMemo(
    () => ((step + 1) / inquirySteps.length) * 100,
    [step],
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canNext = () => {
    if (step === 0) return Boolean(data.path);
    if (step === 1)
      return data.name.trim() && data.email.includes("@") && data.organisation.trim();
    if (step === 2) {
      if (data.path === "investor") return Boolean(data.capitalRange);
      if (data.path === "partner") return Boolean(data.siteType || data.location);
      return true;
    }
    return true;
  };

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    toast.success("Inquiry received, we'll be in touch shortly.");
    console.info("[ReVolt inquiry]", data);
  };

  if (done) {
    return (
      <div className="glass rounded-3xl p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-electric/15 ring-1 ring-electric/40">
          <Check className="h-7 w-7 text-electric" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-ink">You&apos;re charged in</h3>
        <p className="mt-2 text-muted">
          Thanks {data.name.split(" ")[0] || "there"}. Our team will review your{" "}
          {data.path} inquiry and respond soon.
        </p>
        <EnergyBar variant="heartbeat" className="mx-auto mt-8 max-w-sm" />
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
        <span>
          Step {step + 1} / {inquirySteps.length}
        </span>
        <span className="text-electric">{inquirySteps[step].title}</span>
      </div>
      <div
        className="mb-8 h-1 rounded-full step-rail"
        style={{ ["--progress" as string]: `${progress}%` }}
      />

      {step === 0 && (
        <div className="grid gap-3 sm:grid-cols-3">
          {(
            [
              {
                id: "partner" as const,
                title: "Partner / host",
                desc: "Sites, EPC, councils, C&I",
              },
              {
                id: "investor" as const,
                title: "Investor",
                desc: "Capital & portfolio",
              },
              {
                id: "general" as const,
                title: "General",
                desc: "Press, careers, other",
              },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => update("path", opt.id)}
              className={cn(
                "rounded-2xl border p-5 text-left transition charge-border",
                data.path === opt.id
                  ? "border-electric/50 bg-electric/10"
                  : "border-border bg-navy-900/40 hover:border-electric/30",
              )}
            >
              <p className="font-semibold text-ink">{opt.title}</p>
              <p className="mt-1 text-xs text-muted">{opt.desc}</p>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value={data.name} onChange={(v) => update("name", v)} />
          <Field
            label="Work email"
            type="email"
            value={data.email}
            onChange={(v) => update("email", v)}
          />
          <Field
            label="Organisation"
            value={data.organisation}
            onChange={(v) => update("organisation", v)}
          />
          <Field label="Role" value={data.role} onChange={(v) => update("role", v)} />
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          {data.path === "partner" && (
            <>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                  Site / partner type
                </span>
                <select
                  value={data.siteType}
                  onChange={(e) => update("siteType", e.target.value)}
                  className="w-full rounded-xl border border-border bg-navy-900 px-4 py-3 text-base text-ink outline-none focus:border-electric/50 sm:text-sm"
                >
                  <option value="">Select…</option>
                  {partnerTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </label>
              <Field
                label="Location (city / state)"
                value={data.location}
                onChange={(v) => update("location", v)}
              />
              <Field
                label="Indicative capacity or land (optional)"
                value={data.capacity}
                onChange={(v) => update("capacity", v)}
                placeholder="e.g. 5 ha rooftop, 10 MW load"
              />
            </>
          )}
          {data.path === "investor" && (
            <>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                  Indicative capital interest
                </span>
                <select
                  value={data.capitalRange}
                  onChange={(e) => update("capitalRange", e.target.value)}
                  className="w-full rounded-xl border border-border bg-navy-900 px-4 py-3 text-base text-ink outline-none focus:border-electric/50 sm:text-sm"
                >
                  <option value="">Select…</option>
                  <option value="<$5M">&lt; $5M</option>
                  <option value="$5 to $25M">$5 to $25M</option>
                  <option value="$25 to $100M">$25 to $100M</option>
                  <option value="$100M+">$100M+</option>
                  <option value="Strategic / co-dev">Strategic / co-dev</option>
                </select>
              </label>
              <Field
                label="Focus (optional)"
                value={data.capacity}
                onChange={(v) => update("capacity", v)}
                placeholder="BESS, portfolio, development pipeline…"
              />
            </>
          )}
          {data.path === "general" && (
            <Field
              label="Topic"
              value={data.siteType}
              onChange={(v) => update("siteType", v)}
              placeholder="Media, careers, partnership idea…"
            />
          )}
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Message
            </span>
            <textarea
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-border bg-navy-900 px-4 py-3 text-base text-ink outline-none focus:border-electric/50 sm:text-sm"
              placeholder="Tell us what you're building toward…"
            />
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3 rounded-2xl border border-border bg-navy-900/50 p-5 text-sm">
          <Row label="Path" value={data.path} />
          <Row label="Name" value={data.name} />
          <Row label="Email" value={data.email} />
          <Row label="Organisation" value={data.organisation} />
          {data.role && <Row label="Role" value={data.role} />}
          {data.siteType && <Row label="Type" value={data.siteType} />}
          {data.location && <Row label="Location" value={data.location} />}
          {data.capitalRange && (
            <Row label="Capital" value={data.capitalRange} />
          )}
          {data.message && <Row label="Message" value={data.message} />}
          <p className="pt-2 text-xs text-muted">
            Demo form, submissions are logged client-side only. Wire to your CRM
            or email API when ready.
          </p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="!px-4"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        {step < inquirySteps.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
            Continue <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={submit} disabled={submitting}>
            {submitting ? "Transmitting…" : "Send inquiry"}
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-navy-900 px-4 py-3 text-base text-ink outline-none focus:border-electric/50 sm:text-sm"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/50 pb-2 last:border-0">
      <span className="text-muted">{label}</span>
      <span className="text-right text-ink capitalize">{value}</span>
    </div>
  );
}
