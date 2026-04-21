import type { Metadata } from "next";
import Providers from "./Providers";
import "./globals.css";
import { sanity } from "@/lib/sanity";
import { Wrench } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const query = `{
    "settings": *[_type == "siteSettings"][0]{title},
    "about": *[_type == "about"][0]{description}
  }`;

  try {
    const data = await sanity.fetch(query, {}, { next: { tags: ['siteSettings', 'about'] } });
    const settings = data?.settings;
    const about = data?.about;
    
    return {
      title: settings?.title?.tr || "KEFDER - Kültürel Etkileşim ve Farkındalık Derneği",
      description: about?.description?.tr || "Kültürel farkındalık, dayanışma ve toplumsal etkileşim için birlikte çalışıyoruz.",
      icons: {
        icon: "/images/logo.png",
        apple: "/images/logo.png"
      },
      openGraph: {
        images: ["/images/logo.png"]
      }
    };
  } catch {
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
    contactInfo,
    isMaintenanceMode
  }`;
  let settings: any = null;
  try {
    settings = await sanity.fetch(query, {}, { next: { tags: ['siteSettings'] } });
  } catch {}

  if (settings?.isMaintenanceMode) {
    return (
      <html lang="tr">
        <body className="bg-[#FDF6F0] min-h-screen flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-10 text-center shadow-xl border border-orange-100">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wrench className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-[#1F2A44] mb-4">Bakım Molası</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Sizlere daha iyi ve hızlı bir deneyim sunabilmek için sitemizde kısa süreli bir altyapı çalışması gerçekleştiriyoruz. Anlayışınız için teşekkür ederiz, çok yakında tekrar yayındayız!
            </p>
            <div className="text-sm font-semibold text-orange-500">
              KEFDER - Kültürel Etkileşim ve Farkındalık Derneği
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="tr">
      <body>
        <Providers settings={settings}>{children}</Providers>
      </body>
    </html>
  );
}
