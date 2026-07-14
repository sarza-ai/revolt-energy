"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function GlowCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={cn(
        "glass charge-border rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,245,212,0.12)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
