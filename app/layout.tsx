import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Used for button labels — a modern geometric sans, distinct from the body Inter.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "LinkedIn Headline Positioning Engine | Hirenum",
  description:
    "Stop guessing. Start positioning. Audit your current LinkedIn headline and generate 5 strategic variants engineered for your ICP. Free by Hirenum.",
  openGraph: {
    title: "LinkedIn Headline Positioning Engine | Hirenum",
    description:
      "Most tools ask who you are. This one asks who you're trying to attract.",
    url: "https://hirenum.com/headline",
    siteName: "Hirenum",
  },
};

export const viewport: Viewport = {
  themeColor: "#06060d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeScript = `(function(){try{var t=localStorage.getItem('hirenum-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
