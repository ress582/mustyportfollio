import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Musty - Elite Roblox Developer Portfolio",
  description: "Professional portfolio showcasing advanced Roblox Lua scripting, game systems, and development expertise. Specializing in telekinesis systems, combat mechanics, and UI solutions.",
  keywords: ["Roblox developer", "Lua scripting", "game development", "telekinesis system", "combat system", "UI development", "Roblox Studio"],
  authors: [{ name: "Musty" }],
  openGraph: {
    title: "Musty - Elite Roblox Developer Portfolio",
    description: "Professional portfolio showcasing advanced Roblox development projects and Lua scripting expertise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Musty - Elite Roblox Developer Portfolio",
    description: "Professional portfolio showcasing advanced Roblox development projects and Lua scripting expertise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
