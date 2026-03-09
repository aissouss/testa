import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quran Journal",
  description: "Quran memorization tracker"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="dark">
      <body>{children}</body>
    </html>
  );
}
