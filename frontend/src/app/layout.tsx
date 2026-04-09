import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KefDer Prototip",
  description: "KefDer icin Next.js + Sanity prototip sitesi"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
