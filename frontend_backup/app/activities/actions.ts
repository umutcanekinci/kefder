"use server"

import { sanity } from '@/lib/sanity'

export async function getEvents() {
  const query = `*[_type == "event"] | order(date asc){
    _id,
    title,
    description,
    date,
    time,
    location,
    category,
    status
  }`

  try {
    const data = await sanity.fetch(query)
    return data
  } catch (error) {
    console.error('Server Action Sanity fetch error:', error)
    return []
  }
}
