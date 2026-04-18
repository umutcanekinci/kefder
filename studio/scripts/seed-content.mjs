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
      title: "KEFDER - Kültürel Etkileşim ve Farkındalık Derneği",
      isMaintenanceMode: false,
      description: "Kültürel farkındalık, dayanışma ve toplumsal etkileşim için birlikte çalışıyoruz. Bu açıklama Sanity üzerinden gelmektedir.",
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
      title: "Geleneksel KefDer Tanışma Kahvaltısı",
      slug: { current: "geleneksel-kefder-tanisma-kahvaltisi" },
      eventDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Alsancak, İzmir",
      description: blockParagraph("Yeni gönüllülerimizle tanışacağımız ve gelecek dönem projelerimizi konuşacağımız kahvaltı etkinliğimiz."),
      isUpcoming: true
    },
    {
      _id: "seed-event-2",
      _type: "event",
      title: "Toplumsal Farkındalık Semineri",
      slug: { current: "toplumsal-farkindalik-semineri" },
      eventDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      location: "KefDer Konferans Salonu",
      description: blockParagraph("Geçtiğimiz hafta düzenlediğimiz seminerde alanında uzman konukları ağırladık."),
      isUpcoming: false
    },
    {
      _id: "seed-event-3",
      _type: "event",
      title: "Gençlik Kampı 2026",
      slug: { current: "genclik-kampi-2026" },
      eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Seferihisar, İzmir",
      description: blockParagraph("Doğa ile iç içe, ekip ruhunu geliştireceğimiz 3 günlük gençlik kampımıza davetlisiniz! Kontenjanımız sınırlıdır."),
      isUpcoming: true
    },
    {
      _id: "seed-event-4",
      _type: "event",
      title: "Sokak Hayvanları İçin Kulübe Yapımı",
      slug: { current: "sokak-hayvanlari-icin-kulube-yapimi" },
      eventDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Buca Hasanağa Bahçesi",
      description: blockParagraph("Gönüllülerimizin katılımıyla sokaktaki dostlarımız için kışlık kulübeler inşa ettik. Katılan herkese teşekkürler!"),
      isUpcoming: false
    },
    {
      _id: "seed-event-5",
      _type: "event",
      title: "İşaret Dili Temel Eğitimi",
      slug: { current: "isaret-dili-temel-egitimi" },
      eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      location: "KefDer Eğitim Salonu",
      description: blockParagraph("İşitme engelli bireylerle iletişimi güçlendirmek adına temel seviye işaret dili eğitimi başlıyor."),
      isUpcoming: true
    },
    {
      _id: "seed-event-6",
      _type: "event",
      title: "Köy Okulları Kütüphane Projesi",
      slug: { current: "koy-okullari-kutuphane-projesi" },
      eventDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Manisa Köy Okulları",
      description: blockParagraph("Topladığımız binlerce kitabı köy okullarındaki kütüphanelere yerleştirdik. Geleceğe umut olmaya devam ediyoruz."),
      isUpcoming: false
    },
    // NEWS
    {
      _id: "seed-news-1",
      _type: "news",
      title: "KefDer 2026 Vizyon Raporu Yayınlandı",
      slug: { current: "kefder-2026-vizyon-raporu-yayinlandi" },
      publishedAt: now,
      body: blockParagraph("Yeni dönem vizyon raporumuz yayınlandı. Daha yaşanabilir bir dünya için hedeflerimizi büyütüyoruz.")
    },
    {
      _id: "seed-news-2",
      _type: "news",
      title: "Uluslararası Dayanışma Ödülüne Layık Görüldük",
      slug: { current: "uluslararasi-dayanisma-odulune-layik-gorulduk" },
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      body: blockParagraph("Sivil toplum kuruluşları arasında düzenlenen değerlendirme sonucunda KefDer olarak Dayanışma Ödülünü kazandık. Emeği geçen tüm gönüllülerimize minnettarız.")
    },
    {
      _id: "seed-news-3",
      _type: "news",
      title: "Yeni Dernek Merkezimize Taşınıyoruz!",
      slug: { current: "yeni-dernek-merkezimize-tasiniyoruz" },
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      body: blockParagraph("Daha geniş ve donanımlı çalışma alanlarına sahip olmak amacıyla yeni merkezimize geçiş yapıyoruz. Açılış detayları yakında duyurulacaktır.")
    },
    // TEAM MEMBERS
    {
      _id: "seed-teamMember-1",
      _type: "teamMember",
      name: "Ahmet Yılmaz",
      role: "Yönetim Kurulu Başkanı"
    },
    {
      _id: "seed-teamMember-2",
      _type: "teamMember",
      name: "Ayşe Kaya",
      role: "Genel Sekreter"
    },
    {
      _id: "seed-teamMember-3",
      _type: "teamMember",
      name: "Mehmet Demir",
      role: "Eğitim Koordinatörü"
    },
    // DOCUMENTS
    {
      _id: "seed-document-1",
      _type: "kefderDocument",
      title: "2025 Yılı Faaliyet Raporu",
      category: "faaliyetRaporu"
    },
    {
      _id: "seed-document-2",
      _type: "kefderDocument",
      title: "Dernek Tüzüğü",
      category: "tuzuk"
    }
  ];

  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log("OK:", doc._type, doc.title || doc.name || doc._id);
  }

  console.log("\nEkstra veriler başariyla eklendi! Studio'dan kontrol edebilirsiniz.");
}

try {
  await main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
