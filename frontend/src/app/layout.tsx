import type { Metadata } from "next";
import Providers from "./Providers";
import "./globals.css";
import { sanity } from "@/lib/sanity";
import { Wrench } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const query = `{
    "settings": *[_type == "siteSettings"][0]{
      title,
      "logoUrl": logo.asset->url
    },
    "about": *[_type == "about"][0]{description}
  }`;

  try {
    const data = await sanity.fetch(query, {}, { next: { tags: ['siteSettings', 'about'] } });
    const settings = data?.settings;
    const about = data?.about;
    const logo = settings?.logoUrl || "/images/logo.png";
    
    const title = settings?.title?.tr || "KEFDER - Kültürel Etkileşim ve Farkındalık Derneği";
    const description = about?.description?.tr || "Kültürel farkındalık, dayanışma ve toplumsal etkileşim için birlikte çalışıyoruz.";

    return {
      title: { default: title, template: `%s | KEFDER` },
      description,
      metadataBase: new URL('https://www.kefder.org'),
      icons: { icon: logo, apple: logo },
      openGraph: {
        title,
        description,
        url: 'https://www.kefder.org',
        siteName: 'KEFDER',
        images: [{ url: logo, width: 1200, height: 630, alt: 'KEFDER' }],
        locale: 'tr_TR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [logo],
      },
    };
  } catch {
    const title = "KEFDER - Kültürel Etkileşim ve Farkındalık Derneği";
    const description = "Kültürel farkındalık, dayanışma ve toplumsal etkileşim için birlikte çalışıyoruz.";

    return {
      title: { default: title, template: `%s | KEFDER` },
      description,
      metadataBase: new URL('https://www.kefder.org'),
      icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
      openGraph: {
        title,
        description,
        url: 'https://www.kefder.org',
        siteName: 'KEFDER',
        images: [{ url: '/images/logo.png', width: 1200, height: 630, alt: 'KEFDER' }],
        locale: 'tr_TR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/images/logo.png'],
      },
    };
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const query = `*[_type == "siteSettings"][0]{
    socialLinks,
    contactInfo,
    isMaintenanceMode,
    "logoUrl": logo.asset->url
  }`;
  let settings: any = null;
  try {
    settings = await sanity.fetch(query, {}, { next: { tags: ['siteSettings'] } });
  } catch {}

  if (settings?.isMaintenanceMode) {
    return (
      <html lang="tr">
        <body className="bg-[#FDF6F0] min-h-screen flex items-center justify-center p-4 overflow-x-hidden">
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
      <body className="overflow-x-hidden">
        <Providers settings={settings}>{children}</Providers>
      </body>
    </html>
  );
}
