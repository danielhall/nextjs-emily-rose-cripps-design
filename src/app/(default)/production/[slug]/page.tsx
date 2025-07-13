import { type SanityDocument } from "next-sanity";
import { client, CACHE_DURATIONS, CACHE_TAGS, createCacheOptions } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { notFound } from "next/navigation";
import Image from "next/image";

import GridLayout from "../../../components/grid-layout";

const PRODUCTION_POSTS_QUERY = `
  *[
    _type == "post" 
    && defined(slug.current) 
    && defined(job)
    && job->title == $jobTitle
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    image,
    publishedAt,
    description,
    job->{title, introduction, year, portraitPoster}
  }
`;

const options = createCacheOptions(CACHE_DURATIONS.PRODUCTIONS, [CACHE_TAGS.POSTS, CACHE_TAGS.PRODUCTIONS]);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function ProductionPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Extract job title from slug (remove 'production-' prefix and convert back)
  const jobTitle = slug
    .replace('production-', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const posts = await client.fetch<SanityDocument[]>(
    PRODUCTION_POSTS_QUERY, 
    { jobTitle }, 
    options
  );

  if (!posts || posts.length === 0) {
    notFound();
  }

  const job = posts[0]?.job;

  const productionPosts = posts.map((post) => ({
    id: post._id,
    name: post.title,
    image: urlFor(post.image)?.width(500).url()?.toString() || "",
    url: post.slug.current,
    description: post.description || ""
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          {job?.portraitPoster && (
            <Image
              src={urlFor(job.portraitPoster)?.width(100).url() || ""}
              alt={job.title}
              width={64}
              height={96}
              className="w-16 h-24 object-cover rounded border border-gray-300"
            />
          )}
          <div>
            <h1 className="font-primary text-3xl font-bold mb-2">
              {job?.title}
            </h1>
            <p className="text-gray-600 mb-2">{job?.year}</p>
            {job?.introduction && (
              <p className="text-gray-700 leading-relaxed max-w-2xl">
                {job.introduction}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Graphics ({posts.length})
        </h2>
      </div>

      <GridLayout posts={productionPosts} />
    </div>
  );
}
