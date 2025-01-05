import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Introduction from "../components/introduction"
import MasonryLayout from "../components/masonry-layout";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...18]{_id, title, slug, image, publishedAt}`;

const options = { next: { revalidate: 120 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

    const imageUrls = posts
      ? posts.map((i: SanityDocument) => (i ? { id: i._id, name: i.title, image: urlFor(i.image)?.width(700).url().toString(), url: i.slug.current } : null)).filter((item): item is { id: string, name: string, image: string, url: string } => !!item)
      : [];

  return (
    <div
      className="mt-10">
      <Introduction/>
      <MasonryLayout 
          posts={imageUrls} 
          breakpoints={{ 480: 1, 768: 2, 1024: 4 }} 
      />
    </div>
  );
}