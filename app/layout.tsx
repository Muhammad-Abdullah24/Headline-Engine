import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LinkedIn Headline Positioning Engine | Hirenum",
  description:
    "Stop guessing. Start positioning. Audit your current LinkedIn headline and generate 5 strategic variants engineered for your ICP — free by Hirenum.",
  openGraph: {
    title: "LinkedIn Headline Positioning Engine | Hirenum",
    description:
      "Most tools ask who you are. This one asks who you're trying to attract.",
    url: "https://hirenum.com/headline",
    siteName: "Hirenum",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
