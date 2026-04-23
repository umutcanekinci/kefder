"use server"

import { sanity } from "@/lib/sanity"

export async function getAboutData() {
  const query = `{
    "team": *[_type == "teamMember"] | order(_createdAt asc) {
      _id,
      name,
      role,
      "imageUrl": image.asset->url
    },
    "documents": *[_type == "kefderDocument"] | order(_createdAt desc) {
      _id,
      title,
      category,
      "fileUrl": file.asset->url
    },
    "archive": *[_type == "documentArchive"] | order(publishDate desc) {
      _id,
      title,
      fileType,
      "fileUrl": file.asset->url
    },
    "about": *[_type == "about"][0] {
      description,
      mission,
      vision,
      quote,
      philosophyText,
      "philosophyImageUrl": philosophyImage.asset->url,
      targetAudiences,
      activities,
      logoFeatures,
      "officialBylawsUrl": officialBylaws.asset->url,
      "activityReportUrl": activityReport.asset->url,
      "networks": networks[] {
        description,
        shortDescription,
        "logoUrl": logo.asset->url,
        url
      },
      aeccFacebookUrl
    }
  }`

  try {
    const result = await sanity.fetch(query, {}, { 
      next: { 
        tags: ['teamMember', 'kefderDocument', 'documentArchive', 'about'],
        revalidate: 0 
      } 
    })
    console.log("SANITY ABOUT DATA:", result.team?.length, "members found");
    return result
  } catch (error) {
    console.error("Sanity fetch error (about):", error)
    return { team: [], documents: [], settings: null }
  }
}
