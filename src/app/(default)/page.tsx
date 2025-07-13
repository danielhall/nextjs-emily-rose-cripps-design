

import { type SanityDocument } from "next-sanity";
import { client, CACHE_DURATIONS, CACHE_TAGS, createCacheOptions } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Homepage from "../components/homepage";

// Query for featured/recent work
const FEATURED_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...6]{_id, title, slug, image, publishedAt, description}`;

// Query for a hero/featured project
const HERO_POST_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0]{_id, title, slug, image, description, body}`;

const options = createCacheOptions(CACHE_DURATIONS.PORTFOLIO, [CACHE_TAGS.POSTS, CACHE_TAGS.PORTFOLIO]);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function IndexPage() {
  const [featuredPosts, heroPost] = await Promise.all([
    client.fetch<SanityDocument[]>(FEATURED_POSTS_QUERY, {}, options),
    client.fetch<SanityDocument>(HERO_POST_QUERY, {}, options)
  ]);

  const portfolioPosts = featuredPosts.map((post) => ({
    id: post._id,
    name: post.title,
    image: urlFor(post.image)?.width(500).url()?.toString() || "",
    url: post.slug.current,
    description: post.description || ""
  }));

  const heroImageUrl = heroPost?.image 
    ? urlFor(heroPost.image)?.width(1200).url() || null
    : null;

  return (
    <Homepage 
      featuredPosts={portfolioPosts}
      heroPost={heroPost}
      heroImageUrl={heroImageUrl}
    />
  );
}