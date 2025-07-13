import { client, CACHE_DURATIONS, CACHE_TAGS, createCacheOptions } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import ProductionsPageClient from "./page-client";

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && defined(job)] | order(publishedAt desc) {
  _id, title, slug, image, job->{title, introduction, year, portraitPoster, landscapePoster}, publishedAt
}`;

const options = createCacheOptions(CACHE_DURATIONS.PRODUCTIONS, [CACHE_TAGS.POSTS, CACHE_TAGS.PRODUCTIONS]);

export default async function Page() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return <ProductionsPageClient posts={posts} />;
}
