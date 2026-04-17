import {createClient} from '@sanity/client'

export const sanity = createClient({
  projectId: 'gqgdwf2b',
  dataset: 'production',
  apiVersion: '2026-04-16',
  useCdn: false,
})
