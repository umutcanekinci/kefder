"use server"
import { sanity } from "@/lib/sanity"

export async function getContactData() {
  const query = `*[_type == "siteSettings"][0] {
    contactInfo,
    socialLinks
  }`

  try {
    return await sanity.fetch(query, {}, { next: { tags: ['siteSettings'], revalidate: 0 } })
  } catch (error) {
    console.error("İletişim bilgileri çekilemedi:", error)
    return null
  }
}
