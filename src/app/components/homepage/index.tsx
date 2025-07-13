'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { type SanityDocument } from "next-sanity";

import GridLayout from "../grid-layout";

// Helper function to convert PortableText to plain text
function portableTextToPlainText(blocks: unknown[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks
    .filter((block) => block && typeof block === 'object' && '_type' in block && block._type === 'block')
    .map((block) => {
      if (block && typeof block === 'object' && 'children' in block && Array.isArray(block.children)) {
        return block.children
          .filter((child) => child && typeof child === 'object' && '_type' in child && child._type === 'span')
          .map((child) => child && typeof child === 'object' && 'text' in child ? child.text : '')
          .join('');
      }
      return '';
    })
    .join(' ');
}

interface HomepageProps {
  featuredPosts: Array<{
    id: string;
    name: string;
    image: string;
    url: string;
    description: string;
  }>;
  heroPost: SanityDocument;
  heroImageUrl: string | null;
}

export default function Homepage({ featuredPosts, heroPost, heroImageUrl }: HomepageProps) {
  return (
    <div className="mx-auto px-4 md:px-0 space-y-16">
      {/* Hero Section with Featured Work */}
      {heroPost && (
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-sm text-gray-600 uppercase tracking-wide">Featured Work</span>
                <h1 className="font-primary text-4xl md:text-5xl font-semibold mt-2 mb-4">
                  {heroPost.title}
                </h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed md:pr-6">
                  {heroPost.featuredBody 
                    ? portableTextToPlainText(heroPost.featuredBody)
                    : heroPost.description}
                </p>
                <Link 
                  href={`/${heroPost.slug.current}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-[#4fb2b5] transition-colors font-medium"
                >
                  View Graphic
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
            
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {heroImageUrl && (
                  <Link href={`/${heroPost.slug.current}`}>
                    <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] group cursor-pointer">
                      <motion.img
                        src={heroImageUrl}
                        alt={heroPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Work Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-sm text-gray-600 uppercase tracking-wide">Latest Projects</span>
              <h2 className="font-primary text-3xl font-semibold mt-2">Recent Work</h2>
            </div>
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors font-medium"
            >
              View All Work
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          
          <GridLayout posts={featuredPosts} />
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-primary text-white rounded-lg p-8"
        >
          <h2 className="font-primary text-2xl md:text-3xl font-semibold mb-4">
            Ready to Work Together?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            I&apos;m always excited to take on new projects and collaborate with creative teams. 
            <br/>Let&apos;s discuss how we can bring your vision to life.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Get In Touch
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
