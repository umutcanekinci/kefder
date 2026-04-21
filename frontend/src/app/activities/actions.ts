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
    },
    "categories": *[_type == "activity"] | order(order asc) {
      _id,
      title,
      description,
      category,
      icon,
      "imageUrl": image.asset->url
    },
    "memoryGalleries": *[_type == "memoryGallery"] | order(order asc, date desc) {
      _id,
      title,
      description,
      date,
      "coverImage": coverImage.asset->url,
      "images": images[]{
        "url": asset->url,
        caption
      }
    }
  }`

  try {
    const data = await sanity.fetch(query, {}, { next: { tags: ['event', 'documentArchive', 'memoryGallery'], revalidate: 0 } })
    return {
      events: data.events.map((event: any) => ({
        ...event,
        status: event.isUpcoming ? 'upcoming' : 'completed'
      })),
      archive: data.archive || [],
      categories: data.categories || [],
      memoryGalleries: data.memoryGalleries || []
    }
  } catch (error) {
    console.error('Server Action Sanity fetch error:', error)
    return { events: [], archive: [], categories: [], memoryGalleries: [] }
  }
}
