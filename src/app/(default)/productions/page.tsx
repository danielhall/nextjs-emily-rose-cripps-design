import { client, CACHE_DURATIONS, CACHE_TAGS, createCacheOptions } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import Productions from "../../components/productions";

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && defined(job)] | order(publishedAt desc) {
  _id, title, slug, image, job->{title, introduction, year, portraitPoster, landscapePoster}, publishedAt
}`;

const options = createCacheOptions(CACHE_DURATIONS.PRODUCTIONS, [CACHE_TAGS.POSTS, CACHE_TAGS.PRODUCTIONS]);

export default async function Page() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
  <div className="max-w-6xl mx-auto px-4">
    <div className="mb-8">
      <small className="text-gray-600">Browse by</small>
      <h1 className="font-primary text-3xl font-semibold mb-4">Productions</h1>
      <p className="text-gray-700 mb-8">
        Explore my work organised by film and television productions. Each production showcases the design work I contributed to the project.
      </p>
    </div>
    <Productions posts={posts} />
  </div>);
}
