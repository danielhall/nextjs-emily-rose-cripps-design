'use client';

import { motion } from 'framer-motion';
import { type SanityDocument } from "next-sanity";
import GridLayout from "../../../components/grid-layout";

interface Post {
  id: string;
  name: string;
  image: string;
  url: string;
  description: string;
}

interface Props {
  posts: Post[];
  tag: SanityDocument;
}

export default function CategoryPageClient({ posts, tag }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center px-4 md:px-0"
        >
          <span className="text-sm text-gray-600 uppercase tracking-wide">Works tagged with</span>
          <h1 className="font-primary text-4xl md:text-5xl font-semibold mt-2 mb-6">
            {tag.title}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover my creative work within the {tag.title.toLowerCase()} category.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {posts.length > 0 ? (
            <GridLayout posts={posts} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">
                No projects found in this category yet.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check back soon for new work!
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
