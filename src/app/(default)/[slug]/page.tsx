import { type SanityDocument } from "next-sanity";
import { client, CACHE_DURATIONS, CACHE_TAGS, createCacheOptions } from "@/sanity/client";

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
      _id,
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
    && job->_id == $params.jobId
    && _id != $params.currentPostId
  ]
  | order(publishedAt desc)[0...18] 
  {
    _id, 
    title, 
    slug, 
    image, 
    job,
    publishedAt
  }
`;

const options = createCacheOptions(CACHE_DURATIONS.POSTS, [CACHE_TAGS.POSTS]);

export default async function PostPage(params: { 
  params: Promise<{ slug: string }>}) {

  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);

  const jobPostParams = {
    params: {
      jobId: post.job._id,
      currentPostId: post._id
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
      <Project post={post} job={post.job} jobPosts={jobPosts}/>
    </>
  );
}