import { type SanityDocument } from "next-sanity";
import CategoryScroller from "../../components/category-scroller"

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && defined(job) 
]|order(publishedAt desc){_id, title, slug, image, job->{title}, publishedAt}`;

const options = { next: { revalidate: 120 } };

type Category = {
  title: string;
  items: SanityDocument[];
};

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const categories: Category[] = [];

  posts.map((post) => {
      const job = post.job.title;
  
      const jobIndex = categories.findIndex((category) => {
        return category.title == job;
      });

      if (jobIndex <= -1) {
        categories.push({
          title: job,
          items: [post]
        })
      }
      else {
        categories[jobIndex].items.push(post);
      }
  });

  return (
    <>
      <div className="min-h-screen space-y-8">
      {categories.map((category, idx) => (
        <CategoryScroller
          key={idx}
          title={category.title}
          items={category.items}
        />
      ))}
    </div>
    </>
  );
}