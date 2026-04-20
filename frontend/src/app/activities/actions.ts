"use server"

import { sanity } from '@/lib/sanity'

export async function getActivitiesData() {
  const query = `{
    "events": *[_type == "event"] | order(eventDate asc){
      _id,
      title,
      description,
      "date": eventDate,
      location,
      isUpcoming
    },
    "archive": *[_type == "documentArchive"] | order(publishDate desc) {
      _id,
      title,
      fileType,
      "fileUrl": file.asset->url
    }
  }`

  try {
    const data = await sanity.fetch(query, {}, { next: { tags: ['event', 'documentArchive'], revalidate: 0 } })
    return {
      events: data.events.map((event: any) => ({
        ...event,
        status: event.isUpcoming ? 'upcoming' : 'completed'
      })),
      archive: data.archive || []
    }
  } catch (error) {
    console.error('Server Action Sanity fetch error:', error)
    return { events: [], archive: [] }
  }
}
