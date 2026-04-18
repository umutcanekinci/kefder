"use server"

import { sanity } from '@/lib/sanity'

export async function getEvents() {
  const query = `*[_type == "event"] | order(eventDate asc){
    _id,
    title,
    description,
    "date": eventDate,
    location,
    isUpcoming
  }`

  try {
    const data = await sanity.fetch(query, {}, { next: { tags: ['event'] } })
    return data.map((event: any) => ({
      ...event,
      status: event.isUpcoming ? 'upcoming' : 'completed'
    }))
  } catch (error) {
    console.error('Server Action Sanity fetch error:', error)
    return []
  }
}
