import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";
import { MotionEffects } from "./components/MotionEffects";
import { BootIntro } from "./components/BootIntro";

export const metadata: Metadata = {
  title: {
    default: "Abhay Soni — Portfolio & Journal",
    template: "%s — Abhay Soni",
  },
  description:
    "Abhay Soni is a Computer Science student building modern web applications, exploring AI, and turning ideas into real-world projects.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <BootIntro />
        <MotionEffects />
        {children}
      </body>
    </html>
  );
}
