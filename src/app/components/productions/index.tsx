'use client';

import { type SanityDocument } from "next-sanity";
import { motion } from 'motion/react'; 
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/client";

interface Props {
  posts: SanityDocument[];
}

export default function Productions({ posts }: Props) {
  const { projectId, dataset } = client.config();
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  // Group posts by job and create production cards
  const jobMap = new Map();

  posts.forEach((post) => {
    const job = post.job;
    if (!jobMap.has(job.title)) {
      const portraitPosterUrl = job.portraitPoster
        ? urlFor(job.portraitPoster)?.width(300).url()
        : "";

      jobMap.set(job.title, {
        title: job.title,
        introduction: job.introduction,
        year: job.year,
        portraitPoster: portraitPosterUrl ?? "",
        slug: `production-${job.title.toLowerCase().replace(/\s+/g, '-')}`,
        itemCount: 1
      });
    } else {
      jobMap.get(job.title).itemCount++;
    }
  });

  // Convert map to array and sort by year
  const productionArray = Array.from(jobMap.values()).sort((a, b) => b.year - a.year);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {productionArray.map((production, idx) => (
          <motion.div
            key={production.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group"
          >
            <Link href={`/production/${production.slug}`}>
              <div className="bg-white border-2 border-black rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex">
                  {/* Portrait Poster */}
                  <div className="w-32 h-48 flex-shrink-0">
                    {production.portraitPoster ? (
                      <motion.img
                        src={production.portraitPoster}
                        alt={production.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Poster</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-black group-hover:text-gray-700 transition-colors">
                          {production.title}
                        </h3>
                        <span className="text-gray-600 text-sm font-medium">
                          {production.year}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                        {production.introduction}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {production.itemCount} project{production.itemCount !== 1 ? 's' : ''}
                      </span>
                      
                      <div className="flex items-center text-black group-hover:text-gray-700 transition-colors">
                        <span className="text-sm font-medium mr-2">View Projects</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
    </div>
  );
}
