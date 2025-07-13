import { type SanityDocument } from "next-sanity";
import { client, CACHE_DURATIONS, CACHE_TAGS, createCacheOptions } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import GridLayout from "../../components/grid-layout";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...18]{_id, title, slug, image, publishedAt, description}`;

const options = createCacheOptions(CACHE_DURATIONS.PORTFOLIO, [CACHE_TAGS.POSTS, CACHE_TAGS.PORTFOLIO]);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

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
    <div>
      <small className="text-gray-600">Explore my</small>
      <h1 className="font-primary text-3xl font-bold mb-8">Portfolio</h1>
      <GridLayout 
          posts={masonryPosts} 
      />
    </div>
  );
}