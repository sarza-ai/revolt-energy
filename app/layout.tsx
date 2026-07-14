import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteShell } from "@/components/layout/SiteShell";
import { brand } from "@/lib/content";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

export { viewport } from "./viewport";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.revolt.au"),
  title: {
    default: `${brand.name} | Decentralised clean-energy infrastructure`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "BESS",
    "battery energy storage",
    "decentralised energy",
    "Australia NEM",
    "virtual power plant",
    "clean energy infrastructure",
    "ReVolt Energy",
  ],
  applicationName: brand.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: brand.name,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: brand.name,
    description: brand.description,
    type: "website",
    locale: "en_AU",
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/logo-mark.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/images/logo-mark.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [organizationSchema(), websiteSchema()];

  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-navy-950 text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
