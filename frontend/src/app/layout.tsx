import type { Metadata } from "next";
import Providers from "./Providers";
import "./globals.css";
import { sanity } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const query = `*[_type == "siteSettings"][0]{
    title,
    description
  }`;

  try {
    const settings = await sanity.fetch(query, {}, { next: { revalidate: 60 } });
    
    return {
      title: settings?.title || "KEFDER - Kültürel Etkileşim ve Farkındalık Derneği",
      description: settings?.description || "Kültürel farkındalık, dayanışma ve toplumsal etkileşim için birlikte çalışıyoruz.",
      icons: {
        icon: "/images/logo.png",
        apple: "/images/logo.png"
      },
      openGraph: {
        images: ["/images/logo.png"]
      }
    };
  } catch (error) {
    return {
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
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const query = `*[_type == "siteSettings"][0]{
    socialLinks,
    contactInfo
  }`;
  let settings = null;
  try {
    settings = await sanity.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {}

  return (
    <html lang="tr">
      <body>
        <Providers settings={settings}>{children}</Providers>
      </body>
    </html>
  );
}
