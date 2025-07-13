'use client';

import { type SanityDocument } from "next-sanity";
import { motion } from 'motion/react'; 
import CategoryScroller from "../category-scroller";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/client";

type Category = {
  title: string;
  introduction: string;
  year: string;
  items: SanityDocument[];
  portraitPoster: string;
  landscapePoster: string;
};

interface Props {
  posts: SanityDocument[];
}

export default function Productions({ posts }: Props) {
  const categories: Category[] = [];

  posts
    .sort((a, b) => b.job.year - a.job.year)
    .map((post) => {
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
          introduction: job.introduction,
          year: job.year,
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
        <motion.div 
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
          {category.landscapePoster && (
          <div className="relative w-full h-[415px] sm:h-[300px] overflow-hidden rounded-lg">
                <motion.img
                  src={category.landscapePoster}
                  alt={category.title}
                  className="w-full h-full object-cover object-center blur-xl"
                />
                <div className="absolute inset-0 z-10 flex flex-col sm:flex-row p-4 text-white bg-black/50">
                {/* top row container (portrait + text) */}
                <div className="flex flex-row">
                  <div className="w-[100px] sm:w-[100px] lg:w-[200px] flex-none overflow-hidden">
                    <motion.img
                      src={category.portraitPoster}
                      alt={category.title}
                      className="w-[100px] sm:w-[100px] lg:w-[200px] max-w-none object-cover"
                    />
                  </div>
                  <div className="pl-4 lg:pt-3  flex-none">
                    <h2 className="text-xl font-semibold mt-1 md:mt-0 mb-1 lg:mb-2">
                      {category.title} <span className="text-[#CCCCCC] pl-2">{category.year}</span>
                    </h2>
                    <p className="text-sm w-[220px] sm:w-[200px]">
                      {category.introduction}
                    </p>
                  </div>
                </div>

                {/* bottom row container (scroller) */}
                <div className="w-full pt-4 sm:pl-4 sm:pt-0">
                  <CategoryScroller title={category.title} items={category.items} />
                </div>
              </div>

            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
