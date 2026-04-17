import {createClient} from '@sanity/client'

export const sanity = createClient({
<<<<<<< HEAD
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'afcfz11h',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-09',
=======
  projectId: 'gqgdwf2b',
  dataset: 'production',
  apiVersion: '2026-04-16',
>>>>>>> d8c60344fa02e4a963cc5bf63d8ff2f8a241e1f6
  useCdn: false,
})
