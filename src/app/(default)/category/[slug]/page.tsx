import { type SanityDocument } from "next-sanity";
import { client, CACHE_DURATIONS, CACHE_TAGS, createCacheOptions } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import CategoryPageClient from "./page-client";

const POSTS_QUERY = `
  *[
    _type == "post" 
    && defined(slug.current) 
    && $params.slug in tags[]->slug.current
  ] | order(_updatedAt desc, publishedAt desc)[0...20] {
    _id,
    title,
    slug,
    image,
    publishedAt,
    description,
    _updatedAt,
    job->{title}
  }
`;

const TAG_QUERY = `
  *[
    _type == "tag" 
    && defined(slug.current) 
    && $params.slug == slug.current
  ] | order(publishedAt desc)[0...1] {
    _id,
    title,
    slug
  }
`;

const COUNT_QUERY = `
  count(*[
    _type == "post" 
    && defined(slug.current) 
    && $params.slug in tags[]->slug.current
  ])
`;

const options = createCacheOptions(CACHE_DURATIONS.CATEGORIES, [CACHE_TAGS.POSTS, CACHE_TAGS.CATEGORIES, CACHE_TAGS.TAGS]);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function CategoryPage(params: { 
  params: Promise<{ slug: string }>}) {
  const [posts, tag, totalCount] = await Promise.all([
    client.fetch<SanityDocument[]>(POSTS_QUERY, params, options),
    client.fetch<SanityDocument[]>(TAG_QUERY, params, options),
    client.fetch<number>(COUNT_QUERY, params, options)
  ]);

  const masonryPosts = posts
      ? posts.map((i: SanityDocument) => (i ? { 
          id: i._id, 
          name: i.title, 
          image: urlFor(i.image)?.width(500).url().toString(), 
          url: i.slug.current,
          description: i.description,
          jobTitle: i.job?.title || null
        } : null)).filter((item): item is { id: string, name: string, image: string, url: string, description: string, jobTitle: string | null } => !!item)
      : [];

  return <CategoryPageClient posts={masonryPosts} tag={tag[0]} totalCount={totalCount} />;
}
