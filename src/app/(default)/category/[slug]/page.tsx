import { type SanityDocument } from "next-sanity";
import ProjectCard from "../../../components/project-card"
import { client } from "@/sanity/client";

const POSTS_QUERY = `
  *[
    _type == "post" 
    && defined(slug.current) 
    && $params.slug in tags[]->slug.current
  ] | order(publishedAt desc)[0...18] {
    _id,
    title,
    slug,
    image,
    publishedAt
  }
`;

const options = { next: { revalidate: 120 } };

export default async function CategoryPage(params: { 
  params: Promise<{ slug: string }>}) {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, params, options);

  return (
    <>
      <div className="columns-2 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4">
        {posts.map((post, index) => (
            <ProjectCard key={post._id} post={post} index={index} />
        ))}
      </div>
    </>
  );
}
