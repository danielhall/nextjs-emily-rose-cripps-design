import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";

import Project from "../../components/project-detail"
import Gallery from '../../components/gallery';

const POST_QUERY = `
  *[_type == "post" && slug.current == $params.slug][0] {
    ...,
    tags[]-> {
      _id,
      title,
      slug,
      color
    }
  }
`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage(params: { 
  params: Promise<{ slug: string }>}) {

  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);

  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-5xl p-12 flex flex-col gap-4">
        <span>We couldn&apos;t find that</span>
      </main>);
  }

  const postGalleryUrls = post.gallery
    ? post.gallery.map((i: SanityImageSource) => (i ? urlFor(i)?.width(700).url() : null))
    : [];

  return (
    <>
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      <Project post={post}/>
      <Gallery images={postGalleryUrls} />
    </>
  );
}