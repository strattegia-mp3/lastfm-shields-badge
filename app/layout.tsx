import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// SEO
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Last.fm GitHub Badge Generator",
    template: "%s | Last.fm Badge",
  },
  description:
    "Uma API serverless rápida para gerar badges dinâmicos com seus scrobbles do Last.fm e exibir no README do seu GitHub.",
  keywords: [
    "Last.fm",
    "GitHub Badge",
    "Scrobbles",
    "Next.js",
    "API",
    "Shields.io",
    "Profile Readme",
  ],
  authors: [{ name: "Victor Rocha", url: "https://strattegia.dev" }],
  creator: "Victor Rocha",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    title: "Last.fm GitHub Badge Generator",
    description: "Exiba seu histórico musical em tempo real no seu perfil.",
    siteName: "Last.fm Badge",
    images: [
      {
        url: "/og/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Preview do Last.fm GitHub Badge Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Last.fm GitHub Badge Generator",
    description: "Exiba seus scrobbles do Last.fm no seu GitHub Readme.",
    images: ["/og/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {isProduction && <Analytics />}
        {isProduction && gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
