import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cognition | The Team Redefining How Software Is Built",
  description:
    "Cognition builds autonomous AI software engineers. Explore Devin, Windsurf, and the platform powering the next era of software development.",
  openGraph: {
    title: "Cognition | The Team Redefining How Software Is Built",
    description:
      "Cognition builds autonomous AI software engineers. Explore Devin, Windsurf, and the platform powering the next era of software development.",
    siteName: "Cognition",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-white text-[#111]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
