import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// .env dosyasını yükle
dotenv.config()

// Sanity Bağlantı Ayarları
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'afcfz11h',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-03-19',
  token: process.env.SANITY_API_WRITE_TOKEN
})

const members = [
  {"name": "Dr. Emel Alaybeyoğlu", "profession": "Tekstil Mühendisi, Rehber, Mentör", "role": "Başkan"},
  {"name": "Hülya Yolcu", "profession": "Avukat", "role": "Başkan Yardımcısı"},
  {"name": "Serap Çetmeli", "profession": "Tekstil Mühendisi, Ressam", "role": "Üye"},
  {"name": "Medine Uğur", "profession": "Tekstil Mühendisi", "role": "Yönetim Kurulu Üyesi"},
  {"name": "Canan Bayır Gülçay", "profession": "Satış-Pazarlama", "role": "Yönetim Kurulu Üyesi"},
  {"name": "Kısmet Sarıhan", "profession": "Bankacı", "role": "Denetim Kurulu Başkanı"},
  {"name": "Hakan Gülçay", "profession": "Pazarlama", "role": "Denetim Kurulu Üyesi"},
  {"name": "Nilgün Vural", "profession": "Ressam", "role": "Üye"},
  {"name": "Melike Tokbaş", "profession": "Satış Uzmanı", "role": "Denetim Kurulu Üyesi"},
  {"name": "Şelin Özçakır Öztürk", "profession": "Well-being Uzmanı", "role": "Üye"},
  {"name": "Yıldız Arıcan", "profession": "Mimar", "role": "Üye"},
  {"name": "Gökçe Sarıhan", "profession": "Mütercim-Tercüman", "role": "Üye"},
  {"name": "Ahmet Güven", "profession": "Teknik Personel", "role": "Üye"},
  {"name": "Gökçe Özpalanlar", "profession": "Bilgisayar Programcısı", "role": "Üye"},
  {"name": "Lale Alpsoykan", "profession": "Öğretmen", "role": "Yönetim Kurulu Üyesi"},
  {"name": "Başak Paker", "profession": "İth.İhr. Yöneticisi", "role": "Üye"},
  {"name": "Aykan Paker", "profession": "Emekli", "role": "Üye"},
  {"name": "M.Özgür Köroğlu", "profession": "Elektrik Mühendisi", "role": "Üye"}
]

const translations = {
  "Başkan": "President",
  "Başkan Yardımcısı": "Vice President",
  "Üye": "Member",
  "Yönetim Kurulu Üyesi": "Board Member",
  "Denetim Kurulu Başkanı": "Chair of the Supervisory Board",
  "Denetim Kurulu Üyesi": "Supervisory Board Member",
  "Tekstil Mühendisi, Rehber, Mentör": "Textile Engineer, Guide, Mentor",
  "Avukat": "Lawyer",
  "Tekstil Mühendisi, Ressam": "Textile Engineer, Painter",
  "Tekstil Mühendisi": "Textile Engineer",
  "Satış-Pazarlama": "Sales & Marketing",
  "Bankacı": "Banker",
  "Pazarlama": "Marketing",
  "Ressam": "Painter",
  "Satış Uzmanı": "Sales Specialist",
  "Well-being Uzmanı": "Well-being Specialist",
  "Mimar": "Architect",
  "Mütercim-Tercüman": "Translator & Interpreter",
  "Teknik Personel": "Technical Staff",
  "Bilgisayar Programcısı": "Computer Programmer",
  "Öğretmen": "Teacher",
  "İth.İhr. Yöneticisi": "Import-Export Manager",
  "Emekli": "Retired",
  "Elektrik Mühendisi": "Electrical Engineer"
}

async function importData() {
  console.log('🚀 Import işlemi başlıyor...')
  
  for (const member of members) {
    const doc = {
      _type: 'teamMember',
      name: member.name,
      role: {
        tr: member.role,
        en: translations[member.role] || member.role
      },
      profession: {
        tr: member.profession,
        en: translations[member.profession] || member.profession
      }
    }

    try {
      const result = await client.create(doc)
      console.log(`✅ Eklendi: ${result.name}`)
    } catch (err) {
      console.error(`❌ Hata (${member.name}):`, err.message)
    }
  }

  console.log('✨ Tüm üyeler başarıyla aktarıldı!')
}

importData()
