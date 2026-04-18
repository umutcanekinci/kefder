import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'afcfz11h',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-03-19',
  token: process.env.SANITY_API_WRITE_TOKEN,
})

async function migrateData() {
  console.log('🚀 Veri taşıma işlemi başlıyor...')

  try {
    // 1. siteSettings verisini al
    const settings = await client.fetch('*[_type == "siteSettings"][0]{description, mission, vision}')
    
    if (!settings) {
      console.log('❌ siteSettings belgesi bulunamadı.')
      return
    }

    console.log('✅ siteSettings verileri alındı.')

    // 2. Yeni "about" belgesine taşı (veya varsa güncelle)
    await client.createOrReplace({
      _id: 'about',
      _type: 'about',
      description: settings.description,
      mission: settings.mission,
      vision: settings.vision,
    })

    console.log('✅ Veriler "about" belgesine başarıyla taşındı.')
    
    console.log('ℹ️ Artık siteSettings içerisindeki eski alanları silebilirsiniz.')

  } catch (error) {
    console.error('❌ Hata oluştu:', error)
  }
}

migrateData()
