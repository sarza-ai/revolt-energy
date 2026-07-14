"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Mobile-first section titles — phone sizes are the default. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-electric sm:mb-3 sm:text-xs sm:tracking-[0.28em]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-ink glow-text sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {body && (
        <p className="mt-2.5 text-sm leading-relaxed text-muted sm:mt-4 sm:text-lg">
          {body}
        </p>
      )}
    </motion.div>
  );
}
