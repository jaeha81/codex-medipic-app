import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "medipic — Online Medical Consultation",
  description: "Online doctor consultation and prescription delivery. ¥0 consultation fee.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${notoSansJP.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
