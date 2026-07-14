"use client";

import { Toaster } from "sonner";
import { SmoothScroll } from "./SmoothScroll";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      {children}
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "#061428",
            border: "1px solid rgba(0, 245, 212, 0.25)",
            color: "#e8f4ff",
          },
        }}
      />
    </SmoothScroll>
  );
}
