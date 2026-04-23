"use server"
import { sanity } from "@/lib/sanity"

export async function getNewsData() {
  const query = `{
    "news": *[_type == "news"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      "mainImage": mainImage.asset->url,
      body
    },
    "press": *[_type == "press"] | order(publishedAt desc) {
      _id,
      title,
      sourceName,
      "sourceLogoUrl": sourceLogo.asset->url,
      url,
      publishedAt
    }
  }`

  try {
    return await sanity.fetch(query, {}, { next: { tags: ['news', 'press'], revalidate: 0 } })
  } catch (error) {
    console.error("Haberler çekilemedi:", error)
    return { news: [], press: [] }
  }
}
