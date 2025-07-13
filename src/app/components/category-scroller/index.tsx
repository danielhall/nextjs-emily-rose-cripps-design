"use client";
import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { type SanityDocument } from "next-sanity";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useRouter } from "next/navigation";

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

const CategoryScroller: React.FC<CategoryScrollerProps> = ({ items }) => {
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
      {/* Group Row */}
      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
          aria-label="Scroll left"
        >
          <FaChevronLeft size={16} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
          aria-label="Scroll right"
        >
          <FaChevronRight size={16} />
        </button>

        {/* Scrollable Thumbnails */}
        <motion.div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 snap-x snap-mandatory scrollbar-hide p-4 hover:scrollbar-show"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#374151 #f3f4f6'
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              className="flex-none w-64 snap-start group/card relative cursor-pointer"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0}}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(`/${item.slug.current}`)}
            >
              <div className="relative overflow-hidden rounded-lg border-2 border-black aspect-[4/3] bg-white">
                {item.image && (
                  <motion.img
                    src={`${urlFor(item.image)?.width(400).url() || ''}`}
                    alt={`${item.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-all duration-300" />
                
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <h3 className="font-medium text-white text-sm leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>

  );
};

export default CategoryScroller;
