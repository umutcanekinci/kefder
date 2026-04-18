"use server"
import { sanity } from "@/lib/sanity"

export async function getNews() {
  const query = `*[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    body
  }`

  try {
    return await sanity.fetch(query, {}, { next: { tags: ['news'], revalidate: 0 } })
  } catch (error) {
    console.error("Haberler çekilemedi:", error)
    return []
  }
}
