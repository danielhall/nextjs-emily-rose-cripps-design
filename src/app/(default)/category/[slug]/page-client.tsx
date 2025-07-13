'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
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
  totalCount: number;
}

export default function CategoryPageClient({ posts: initialPosts, tag, totalCount }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length < totalCount);
  const [offset, setOffset] = useState(20);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/category?offset=${offset}&slug=${tag.slug.current}`);
      const data = await response.json();
      
      if (data.posts && data.posts.length > 0) {
        setPosts(prev => [...prev, ...data.posts]);
        setOffset(prev => prev + data.posts.length);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Load More Button */}
        {hasMore && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 text-sm mb-4">
              Showing {posts.length} of {totalCount} graphics
            </p>
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
