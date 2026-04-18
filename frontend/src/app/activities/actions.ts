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
    const data = await sanity.fetch(query, {}, { next: { revalidate: 0 } })
    return data.map((event: any) => {
      // Portable Text'i Düz Metne Çevir
      let plainDescription = event.description || '';
      if (Array.isArray(event.description)) {
        plainDescription = event.description
          .filter((block: any) => block._type === 'block')
          .map((block: any) => block.children?.map((child: any) => child.text).join(''))
          .join('\n\n');
      }

      return {
        ...event,
        description: plainDescription,
        status: event.isUpcoming ? 'upcoming' : 'completed'
      }
    })
  } catch (error) {
    console.error('Server Action Sanity fetch error:', error)
    return []
  }
}
