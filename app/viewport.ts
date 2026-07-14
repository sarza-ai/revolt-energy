import type { Viewport } from "next";

/** iOS / Android viewport + browser chrome colors */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f0a" },
    { media: "(prefers-color-scheme: light)", color: "#0a0f0a" },
  ],
  colorScheme: "dark",
};
