import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteTitle } from "~/components/SiteTitle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Bookmark Speaker",
  description:
    "Tech Bookmark Speakerは、ブックマークした技術記事を要約し、音声で読み上げるサービスです。",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-800`}
      >
        <div className="p-4">
          <header className="max-w-4xl mx-auto mb-8">
            <SiteTitle />
          </header>
          <main className="max-w-[1024px] mx-auto px-4 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
