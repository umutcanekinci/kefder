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

async function updateData() {
  console.log('🚀 AECC Facebook linki güncelleniyor...')

  try {
    await client.patch('about')
      .set({ aeccFacebookUrl: 'https://www.facebook.com/groups/aeccizmir' })
      .commit()

    console.log('✅ AECC Facebook linki başarıyla güncellendi.')
  } catch (error) {
    console.error('❌ Hata oluştu:', error)
  }
}

updateData()
