import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'

interface PostSitemap {
  slug: { current: string }
  publishedAt: string
  _updatedAt: string
}

interface TagSitemap {
  slug: { current: string }
  _updatedAt: string
}

interface ProductionSitemap {
  job: { title: string }
  _updatedAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.emilyrcripps.com'
  
  // Fetch all posts for dynamic routes
  const posts = await client.fetch<PostSitemap[]>(`
    *[_type == "post" && defined(slug.current)] {
      slug,
      publishedAt,
      _updatedAt
    }
  `)

  // Fetch all categories/tags for dynamic routes
  const tags = await client.fetch<TagSitemap[]>(`
    *[_type == "tag" && defined(slug.current)] {
      slug,
      _updatedAt
    }
  `)

  // Fetch all productions for dynamic routes
  const productions = await client.fetch<ProductionSitemap[]>(`
    *[_type == "post" && defined(job)] {
      job->{title},
      _updatedAt
    }
  `)

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/productions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Dynamic post routes
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.slug.current}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic category routes
  const categoryRoutes = tags.map((tag) => ({
    url: `${baseUrl}/category/${tag.slug.current}`,
    lastModified: new Date(tag._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Dynamic production routes
  const uniqueProductions = Array.from(
    new Set(productions.map((p) => p.job?.title).filter(Boolean))
  )
  const productionRoutes = uniqueProductions.map((title) => ({
    url: `${baseUrl}/production/${(title as string).toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...postRoutes,
    ...categoryRoutes,
    ...productionRoutes,
  ]
}
