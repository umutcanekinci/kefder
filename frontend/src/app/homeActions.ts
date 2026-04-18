"use server"

import { sanity } from "@/lib/sanity"

export async function getHomeActivities() {
  const query = `*[_type == "activity"] | order(order asc) {
    _id,
    title,
    description,
    category,
    icon,
    "imageUrl": image.asset->url
  }`

  try {
    const result = await sanity.fetch(query, {}, { 
      next: { 
        tags: ['activity'],
        revalidate: 0 
      } 
    })
    return result
  } catch (error) {
    console.error("Sanity fetch error (activities):", error)
    return []
  }
}

export async function getEvents() {
  const query = `*[_type == "event"] | order(eventDate asc) {
    _id,
    title,
    eventDate,
    location,
    "posterUrl": eventPoster.asset->url,
    content,
    isUpcoming
  }`

  try {
    const result = await sanity.fetch(query, {}, { 
      next: { 
        tags: ['event'],
        revalidate: 0 
      } 
    })
    return result
  } catch (error) {
    console.error("Sanity fetch error (events):", error)
    return []
  }
}
