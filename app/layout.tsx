import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "سنڌي خبر - Sindhi News Daily",
  description: "روزاني سنڌي خبرون ⹁ سياست ⹁ کيل ⹁ ثقافت ⹁ تعليم ⹁ تفريح",
  keywords: "سنڌي خبرون⹁ Sindhi News⹁ سنڌ⹁ Pakistan⹁ خبرون",
  openGraph: {
    title: "سنڌي خبر - Sindhi News Daily",
    description: "روزاني سنڌي خبرون ⹁ سياست ⹁ کيل ⹁ ثقافت ⹁ تعليم ⹁ تفريح",
    type: "website",
    locale: "sd",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sd" dir="rtl">
      <body
        className={`${notoSansArabic.variable} antialiased font-sans`}
        style={{ fontFamily: "var(--font-noto-arabic), 'Noto Sans Arabic', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
