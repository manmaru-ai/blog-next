import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Blog",
  description: "技術ブログ・プログラミング関連の記事を発信しています",
  keywords: ["プログラミング", "技術ブログ", "Web開発", "Next.js"],
  authors: [{ name: "Tech Blog Admin" }],
  creator: "Tech Blog Admin",
  publisher: "Tech Blog",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tech Blog",
    description: "技術ブログ・プログラミング関連の記事を発信しています",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog",
    description: "技術ブログ・プログラミング関連の記事を発信しています",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <div className="pt-16">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
