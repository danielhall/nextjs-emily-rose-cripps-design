"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CategoryScrollerProps {
  title: string;
  items: { id: string; imageUrl: string }[];
}

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

  return (
    <div className="relative space-y-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hidden group-hover:block"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hidden group-hover:block"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Scrollable Thumbnails */}
        <motion.div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide p-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="min-w-[250px] h-[225px] bg-gray-800 rounded overflow-hidden"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryScroller;
