import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";

import Project from "../../components/project-detail"

const POST_QUERY = `
  *[_type == "post" && slug.current == $params.slug][0] {
    _id,
    title,
    body,
    slug,
    image,
    gallery,
    publishedAt,
    job->{
      title, 
      year, 
      image
    },
    tags[]->{
      _id,
      title,
      slug,
      color
    }
  }
`;


const JOB_POSTS_QUERY = `
  *[  
    _type == "post" 
    && job._id == $params.jobId
    ]
    | order(publishedAt desc)[0...18] 
    {
      _id, 
      title, 
      slug, 
      image, 
      publishedAt
    }
`;

const options = { next: { revalidate: 30 } };

export default async function PostPage(params: { 
  params: Promise<{ slug: string }>}) {

  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);

  const jobPostParams = {
    params: {
      jobId: post.job._id
    }
  };

  const jobPosts = await client.fetch<SanityDocument[]>(JOB_POSTS_QUERY, jobPostParams, options);

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
      <Project post={post} job={post.job} jobPosts={jobPosts}/>
    </>
  );
}