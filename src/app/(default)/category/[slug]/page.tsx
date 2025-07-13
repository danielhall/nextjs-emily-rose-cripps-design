import { type SanityDocument } from "next-sanity";
import { client, CACHE_DURATIONS, CACHE_TAGS, createCacheOptions } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import GridLayout from "../../../components/grid-layout";

const POSTS_QUERY = `
  *[
    _type == "post" 
    && defined(slug.current) 
    && $params.slug in tags[]->slug.current
  ] | order(publishedAt desc)[0...18] {
    _id,
    title,
    slug,
    image,
    publishedAt,
    description
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

const options = createCacheOptions(CACHE_DURATIONS.CATEGORIES, [CACHE_TAGS.POSTS, CACHE_TAGS.CATEGORIES, CACHE_TAGS.TAGS]);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function CategoryPage(params: { 
  params: Promise<{ slug: string }>}) {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, params, options);
  const tag = await client.fetch<SanityDocument[]>(TAG_QUERY, params, options);

  const masonryPosts = posts
      ? posts.map((i: SanityDocument) => (i ? { 
          id: i._id, 
          name: i.title, 
          image: urlFor(i.image)?.width(500).url().toString(), 
          url: i.slug.current,
          description: i.description
        } : null)).filter((item): item is { id: string, name: string, image: string, url: string, description: string } => !!item)
      : [];

  return (
    <>
      <small>Works tagged with</small>
      <h1 className="font-primary text-3xl font-bold mb-8">{tag[0].title}</h1>
      <GridLayout 
          posts={masonryPosts} 
      />
    </>
  );
}
