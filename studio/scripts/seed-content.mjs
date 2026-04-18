import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import "dotenv/config";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2026-04-09";
const token = process.env.SANITY_API_WRITE_TOKEN;

function k() {
  return randomUUID().replaceAll("-", "").slice(0, 12);
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

// Locale Helpers
function ls(tr, en = "") {
  return { tr, en: en || `English Translation: ${tr}` };
}

function lb(trText, enText = "") {
  return {
    tr: blockParagraph(trText),
    en: blockParagraph(enText || `English Translation: ${trText}`)
  };
}

async function main() {
  if (!projectId || !token) {
    console.error("Eksik ortam: SANITY_STUDIO_PROJECT_ID ve SANITY_API_WRITE_TOKEN .env icinde olmali.");
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
  
  const docs = [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      title: ls("KEFDER - Kültürel Etkileşim ve Farkındalık Derneği", "KEFDER - Cultural Interaction and Awareness Association"),
      isMaintenanceMode: false,
      description: ls("Kültürel farkındalık, dayanışma ve toplumsal etkileşim için birlikte çalışıyoruz.", "We work together for cultural awareness, solidarity and social interaction."),
      mission: ls("Toplumsal farkındalık düzeyini yükseltmek ve sürdürülebilir bir dayanışma ağı oluşturmaktır.", "To raise the level of social awareness and create a sustainable solidarity network."),
      vision: ls("Kültürel farklılıkların zenginlik kabul edildiği bir gelecek hayal ediyoruz.", "We dream of a future where cultural differences are accepted as wealth."),
      contactInfo: {
        email: "iletisim@kefder.org",
        phone: "+90 555 123 45 67",
        address: "KefDer Genel Merkezi, İzmir, Türkiye"
      },
      socialLinks: {
        facebook: "https://facebook.com/kefder",
        instagram: "https://instagram.com/kefder",
        youtube: "https://youtube.com/kefder"
      }
    },
    // EVENTS
    {
      _id: "seed-event-1",
      _type: "event",
      title: ls("Geleneksel KefDer Tanışma Kahvaltısı", "Traditional KefDer Meet-up Breakfast"),
      slug: { current: "geleneksel-kefder-tanisma-kahvaltisi" },
      eventDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      location: ls("Alsancak, İzmir", "Alsancak, Izmir"),
      description: lb("Yeni gönüllülerimizle tanışacağımız ve gelecek dönem projelerimizi konuşacağımız kahvaltı etkinliğimiz."),
      isUpcoming: true
    },
    {
      _id: "seed-event-2",
      _type: "event",
      title: ls("Toplumsal Farkındalık Semineri", "Social Awareness Seminar"),
      slug: { current: "toplumsal-farkindalik-semineri" },
      eventDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      location: ls("KefDer Konferans Salonu", "KefDer Conference Hall"),
      description: lb("Geçtiğimiz hafta düzenlediğimiz seminerde alanında uzman konukları ağırladık."),
      isUpcoming: false
    },
    {
      _id: "seed-event-3",
      _type: "event",
      title: ls("Gençlik Kampı 2026", "Youth Camp 2026"),
      slug: { current: "genclik-kampi-2026" },
      eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      location: ls("Seferihisar, İzmir", "Seferihisar, Izmir"),
      description: lb("Doğa ile iç içe, ekip ruhunu geliştireceğimiz 3 günlük gençlik kampımıza davetlisiniz!"),
      isUpcoming: true
    },
    // NEWS
    {
      _id: "seed-news-1",
      _type: "news",
      title: ls("KefDer 2026 Vizyon Raporu Yayınlandı", "KefDer 2026 Vision Report Published"),
      slug: { current: "kefder-2026-vizyon-raporu-yayinlandi" },
      publishedAt: now,
      body: lb("Yeni dönem vizyon raporumuz yayınlandı. Daha yaşanabilir bir dünya için hedeflerimizi büyütüyoruz.")
    },
    {
      _id: "seed-news-2",
      _type: "news",
      title: ls("Uluslararası Dayanışma Ödülüne Layık Görüldük", "We Received International Solidarity Award"),
      slug: { current: "uluslararasi-dayanisma-odulune-layik-gorulduk" },
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      body: lb("Sivil toplum kuruluşları arasında düzenlenen değerlendirme sonucunda KefDer olarak Dayanışma Ödülünü kazandık.")
    },
    // TEAM MEMBERS
    {
      _id: "seed-teamMember-1",
      _type: "teamMember",
      name: "Ahmet Yılmaz",
      role: ls("Yönetim Kurulu Başkanı", "President of the Board")
    },
    {
      _id: "seed-teamMember-2",
      _type: "teamMember",
      name: "Ayşe Kaya",
      role: ls("Genel Sekreter", "General Secretary")
    },
    // DOCUMENTS
    {
      _id: "seed-document-1",
      _type: "kefderDocument",
      title: ls("2025 Yılı Faaliyet Raporu", "2025 Annual Report"),
      category: "faaliyetRaporu"
    },
    {
      _id: "seed-document-2",
      _type: "kefderDocument",
      title: ls("Dernek Tüzüğü", "Association Bylaws"),
      category: "tuzuk"
    }
  ];

  console.log("Veriler temizleniyor ve yeniden yükleniyor...");

  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log("OK:", doc._type, (doc.title?.tr || doc.name || doc._id));
  }

  console.log("\nÇok dilli veriler başariyla güncellendi! Studio'daki hata mesajlari gitmiş olmali.");
}

try {
  await main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
