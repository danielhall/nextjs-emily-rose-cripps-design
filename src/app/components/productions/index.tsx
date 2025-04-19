'use client';

import { type SanityDocument } from "next-sanity";
import { motion } from 'motion/react'; 
import CategoryScroller from "../category-scroller";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/client";

type Category = {
  title: string;
  items: SanityDocument[];
  portraitPoster: string;
  landscapePoster: string;
};

interface Props {
  posts: SanityDocument[];
}

export default function Productions({ posts }: Props) {
  const categories: Category[] = [];

  posts.map((post) => {
    const job = post.job;

    const jobIndex = categories.findIndex((category) => {
      return category.title == job.title;
    });

    const { projectId, dataset } = client.config();
    const urlFor = (source: SanityImageSource) =>
      projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;
    
    const portraitPosterUrl = job.portraitPoster
        ? urlFor(job.portraitPoster)?.width(200).url()
        : undefined;

    const landscapePosterUrl = job.landscapePoster
        ? urlFor(job.landscapePoster)?.width(1000).url()
        : undefined;

        console.log("motion:", motion);

    if (jobIndex <= -1) {
      categories.push({
        title: job.title,
        portraitPoster: portraitPosterUrl ?? "",
        landscapePoster: landscapePosterUrl ?? "",
        items: [post]
      })
    }
    else {
      categories[jobIndex].items.push(post);
    }
});

  return (
    <div className="min-h-screen space-y-8">
      {categories.map((category, idx) => (
        <div key={idx}>
          {category.landscapePoster && (
          <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                <motion.img
                    src={category.landscapePoster}
                    alt={category.title}
                    className="w-full h-full object-cover object-center blur-md"
                />
                
                <div className="absolute inset-0 z-10 flex p-4 ">
                    <div className="relative w-[300px] overflow-hidden text-white bg-black/50">
                        <motion.img
                            src={category.portraitPoster}
                            alt={category.title}
                            className="w-full h-auto object-cover object-top"
                        />
                    </div>
                    

                    <div className="text-white bg-black/50 p-4">
                        <h2 className="text-xl font-semibold  mt-2 mb-2">{category.title}</h2>
                        <p className="text-sm w-[200px]">Emily is going to write some delicious content here. Emily is going to write some delicious content here. Emily is going to write some delicious content here. Emily is going to write some delicious content here. Emily is going to write some delicious content here. </p>
                    </div>

                    <div className="text-white w-full text-2xl font-bold bg-black/50 p-4">
                        <CategoryScroller title={category.title} items={category.items} />
                    </div>
                </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
