import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";

import Project from "../../components/project-detail"

const POST_QUERY = `
  *[_type == "post" && slug.current == $params.slug][0] {
    ...,
    tags[]-> {
      _id,
      title,
      slug,
      color,
      job->{title, year, image}
    }
  }
`;

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

  return (
    <>
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      <Project post={post}/>
    </>
  );
}