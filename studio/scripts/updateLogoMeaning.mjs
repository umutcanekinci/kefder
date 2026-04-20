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

const logoFeatures = [
  {
    _key: 'feat1',
    title: { en: 'Open Padlock', tr: 'Açık Kilit' },
    description: { 
      en: 'Our association serves as a KEYSTONE in cultural interaction. The open padlock expresses that we are open to all kinds of thoughts and ideas.', 
      tr: 'Derneğimiz, kültürel etkileşimde KİLİT görevi görür. Açık kilit, her tür düşünceye açık olduğumuzu ifade eder.' 
    }
  },
  {
    _key: 'feat2',
    title: { en: 'Gray Color', tr: 'Gri Renk' },
    description: { 
      en: 'Impartiality, objectivity, humility, and conciliation.', 
      tr: 'Tarafsızlık, objektiflik, alçakgönüllülük, uzlaştırıcılık.' 
    }
  },
  {
    _key: 'feat3',
    title: { en: 'Colorful Hearts', tr: 'Renkli Kalpler' },
    description: { 
      en: 'Represents different cultures.', 
      tr: 'Farklı kültürler.' 
    }
  },
  {
    _key: 'feat4',
    title: { en: 'Yellow Color', tr: 'Sarı Renk' },
    description: { 
      en: 'Intelpower, mental quality, and abundance.', 
      tr: 'Entelektüel güç, zihinsel kalite, bolluk.' 
    }
  },
  {
    _key: 'feat5',
    title: { en: 'Turquoise Color', tr: 'Turkuaz Renk' },
    description: { 
      en: 'Turkish blue. Serenity, eternity, vastness, calmness, and love of life.', 
      tr: 'Türk mavisi. Sükunet, sonsuzluk, enginlik, dinginlik, yaşam sevgisi.' 
    }
  },
  {
    _key: 'feat6',
    title: { en: 'Orange Color', tr: 'Turuncu Renk' },
    description: { 
      en: 'Intuition, balance, optimism, vitality, and joy.', 
      tr: 'Önsezi, denge, iyimserlik, canlılık, neşe.' 
    }
  },
  {
    _key: 'feat7',
    title: { en: 'Three Hearts & Clover', tr: 'Üç Kalp & Yonca' },
    description: { 
      en: 'Our shared values, hope, and luck.', 
      tr: 'Ortak değerlerimiz, umut ve şans.' 
    }
  }
]

async function updateData() {
  console.log('🚀 Logo anlamları güncelleniyor...')

  try {
    await client.patch('about')
      .set({ logoFeatures })
      .commit()

    console.log('✅ Logo anlamları başarıyla güncellendi.')
  } catch (error) {
    console.error('❌ Hata oluştu:', error)
  }
}

updateData()
