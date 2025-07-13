'use client';

import { motion } from 'framer-motion';
import { type SanityDocument } from "next-sanity";
import Productions from "../../components/productions";

interface Props {
  posts: SanityDocument[];
}

export default function ProductionsPageClient({ posts }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4">
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
          className="text-center"
        >
          <span className="text-sm text-gray-600 uppercase tracking-wide">Browse by</span>
          <h1 className="font-primary text-4xl md:text-5xl font-semibold mt-2 mb-6">
            Productions
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore my work organised by film and television productions. Each production showcases the design work I contributed to the project.
          </p>
        </motion.div>

        {/* Productions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Productions posts={posts} />
        </motion.div>
      </motion.div>
    </div>
  );
}
