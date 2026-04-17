import type { Metadata } from "next";
import Providers from "./Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "KEFDER - Kültürel Etkileşim ve Farkındalık Derneği",
  description: "Kültürel farkındalık, dayanışma ve toplumsal etkileşim için birlikte çalışıyoruz.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png"
  },
  openGraph: {
    images: ["/images/logo.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
