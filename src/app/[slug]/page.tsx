import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";

import Project from "../components/project"

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
  
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(700).url()
    : null;

  return (
    <>
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 md:col-span-6 p-2">
          {postImageUrl && (
            <img
              src={postImageUrl}
              alt={post.title}
              className="rounded-xl shadow-md"
              width="700"
            />
          )}
        </div>
        <div className="col-span-6 md:col-span-6 p-2">
          <Project post={post}/>
        </div>
      </div>
    </>
  );
}