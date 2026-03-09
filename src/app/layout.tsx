import type { Metadata } from "next";
import "./globals.css";
import { QuranProvider } from "@/components/shared/quran-provider";

export const metadata: Metadata = {
  title: "Quran Journal",
  description: "Quran memorization tracker"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="dark">
      <body>
        <QuranProvider>{children}</QuranProvider>
      </body>
    </html>
  );
}
