"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { type SanityDocument } from "next-sanity";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useRouter } from "next/navigation";

import { ArrowRightIcon } from "@radix-ui/react-icons"

import { client } from "@/sanity/client";

interface CategoryScrollerProps {
  title: string;
  items: SanityDocument[];
}

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) => 
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const CategoryScroller: React.FC<CategoryScrollerProps> = ({ title, items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const router = useRouter();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mt-5 mb-2">{title}</h2>
      
      {/* Group Row */}
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hidden group-row:hover:block"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hidden group-row:hover:block"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Scrollable Thumbnails */}
        <motion.div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-3 snap-x snap-mandatory scrollbar-hide p-3"
        >
          {items.map((item) => (
            // Group Image now correctly scoped
            <motion.div
              key={item._id}
              className="flex-none w-48 h-48 text-white flex items-center justify-center snap-start group relative"
              whileHover={{
                scale: 1.04,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 1 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0}}
              transition={{ delay: 0.1 }}
              onClick={() => router.push(`/${item.slug.current}`)}
            >
              <motion.img
                src={`${urlFor(item.image)?.width(400).url() || ''}`}
                alt={`${item.title}`}
                className="w-full h-full object-cover rounded-md shadow-md cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <span 
                className="pointer-events-none absolute top-1 right-1 p-2 text-white font-semibold rounded-md bg-background-50/90 backdrop-blur-sm backdrop-brightness-50
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
                <ArrowRightIcon className="inline-block ml-1 mb-1"/>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>

  );
};

export default CategoryScroller;
