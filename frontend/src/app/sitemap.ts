import { MetadataRoute } from 'next'
import { sanity } from '@/lib/sanity'

const BASE_URL = 'https://www.kefder.org'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/activities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/haberler`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/volunteer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  try {
    const news = await sanity.fetch<{ slug: string; publishedAt: string }[]>(
      `*[_type == "news" && defined(slug.current)]{ "slug": slug.current, publishedAt }`,
      {},
      { next: { tags: ['news'] } }
    )

    const newsRoutes: MetadataRoute.Sitemap = news.map((item) => ({
      url: `${BASE_URL}/haberler/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    return [...staticRoutes, ...newsRoutes]
  } catch {
    return staticRoutes
  }
}
