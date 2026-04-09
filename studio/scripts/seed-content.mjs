/**
 * Ornek icerik ekler (projeler, yazilar, etkinlikler, yonetim kurulu).
 * Gereksinim: studio/.env icinde SANITY_STUDIO_PROJECT_ID + SANITY_API_WRITE_TOKEN
 * Token: https://www.sanity.io/manage -> proje -> API -> Tokens (Editor)
 */
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

import "dotenv/config";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2026-04-09";
const token = process.env.SANITY_API_WRITE_TOKEN;

function k() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function blockParagraph(text) {
  return [
    {
      _type: "block",
      _key: k(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: k(), text, marks: [] }]
    }
  ];
}

async function main() {
  if (!projectId || !token) {
    console.error(
      "Eksik ortam: SANITY_STUDIO_PROJECT_ID ve SANITY_API_WRITE_TOKEN studio/.env dosyasinda tanimli olmali.\n" +
        "Token olustur: sanity.io/manage -> Proje -> API -> Tokens (Editor)."
    );
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false
  });

  const now = new Date().toISOString();
  const today = now.slice(0, 10);

  const docs = [
    {
      _id: "seed-kefder-proje-ornek",
      _type: "projects",
      title: "Ornek Toplumsal Proje",
      slug: { current: "ornek-toplumsal-proje" },
      summary:
        "Bu kayit, prototip ve Vercel onizlemesinde projeler listesinin dolu gorunmesi icin otomatik eklenmistir. Isterseniz Studio uzerinden duzenleyip yayinlayin.",
      status: "active",
      startDate: today,
      relatedLinks: [
        {
          _key: k(),
          title: "KefDer",
          url: "https://github.com/umutcanekinci/kefder"
        }
      ]
    },
    {
      _id: "seed-kefder-duyuru-ornek",
      _type: "posts",
      title: "KefDer Web Prototipi Yayinda",
      slug: { current: "kefder-web-prototipi-yayinda" },
      excerpt:
        "Yeni web prototipi Sanity ile yonetilebilir icerik ve Next.js ile hizli bir deneyim sunuyor. Bu metin ornek bir duyurudur.",
      body: blockParagraph(
        "Bu icerik seed script ile eklendi. Studio'dan guncelleyebilir, gorsel ve kategori alanlarini doldurabilirsiniz."
      ),
      category: "Duyuru",
      publishedAt: now,
      isFeatured: true
    },
    {
      _id: "seed-kefder-etkinlik-ornek",
      _type: "events",
      title: "Gonullu Bilgilendirme Toplantisi",
      slug: { current: "gonullu-bilgilendirme-toplantisi" },
      description:
        "Dernegimizin calismalari ve gonullu surecleri hakkinda kisa bir bilgilendirme oturumu. Bu etkinlik ornek kayittir.",
      location: "Online / TBD",
      startDateTime: now,
      endDateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      isHighlighted: false
    },
    {
      _id: "seed-kefder-yonetim-ornek",
      _type: "board_members",
      name: "Ornek Yonetim Kurulu Uyesi",
      role: "Baskan Yardimcisi",
      bio: "Bu kisi ornek kayittir; Studio'dan gercek uyelerle degistirebilirsiniz.",
      order: 1
    }
  ];

  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log("OK:", doc._type, doc._id);
  }

  console.log("\nTamamlandi. Studio veya API ile kontrol edin; Vercel sitesi bir sure icinde (ISR) guncellenecektir.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
