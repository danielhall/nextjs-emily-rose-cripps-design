import { type SanityDocument } from "next-sanity";
import CategoryScroller from "../../components/category-scroller"
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) => 
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && defined(job) 
]|order(publishedAt desc){_id, title, slug, image, job->{title}, publishedAt}`;

const options = { next: { revalidate: 120 } };

type Item = {
  id: string;
  imageUrl: string;
};

type Category = {
  title: string;
  items: Item[];
};

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const categories: Category[] = [];

  posts.map((post, index) => {
      const job = post.job.title;
  
      const jobIndex = categories.findIndex((category) => {
        return category.title == job;
      });

      if (jobIndex <= -1) {
        categories.push({
          title: job,
          items: [{
            id: index.toString(),
            imageUrl: urlFor(post.image)?.width(400).url() || ''
          }]
        })
      }
      else {
        categories[jobIndex].items.push({
          id: index.toString(),
          imageUrl: urlFor(post.image)?.width(400).url() || ''
        });
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