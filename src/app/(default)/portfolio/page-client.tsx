'use client';

import { motion } from 'framer-motion';
import GridLayout from "../../components/grid-layout";

interface Post {
  id: string;
  name: string;
  image: string;
  url: string;
  description: string;
}

interface Props {
  posts: Post[];
}

export default function PortfolioPageClient({ posts }: Props) {
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
          <span className="text-sm text-gray-600 uppercase tracking-wide">Explore my</span>
          <h1 className="font-primary text-4xl md:text-5xl font-semibold mt-2 mb-6">
            Portfolio
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A curated collection of my design work spanning film, television, branding, and digital projects.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GridLayout posts={posts} />
        </motion.div>
      </motion.div>
    </div>
  );
}
