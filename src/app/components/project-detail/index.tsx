"use client";
import React from 'react';
import { PortableText, type SanityDocument } from 'next-sanity';
import { motion } from 'framer-motion';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

import Gallery from '../../components/gallery';
import CategoryScroller from '../../components/category-scroller';

import Tag from '../tag'

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const Project = ({ post, job, jobPosts }: { post: SanityDocument, job: SanityDocument | undefined, jobPosts: SanityDocument[] }) => {
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(700).url()
    : null;

  const postGalleryUrls = post.gallery
    ? post.gallery.map((i: SanityImageSource) => (i ? urlFor(i)?.width(700).url() : null))
    : [];

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="p-2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {postImageUrl && (
            <motion.img
              src={postImageUrl}
              alt={post.title}
              className="rounded-xl shadow-md w-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            />
          )}
        </motion.div>
        <motion.div 
          className="p-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
        >
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {post.tags && (
              post.tags.map((tag: SanityDocument, index: number) => (
                <div className="inline-block p-1" key={`tag-${index}`}>
                  <Tag key={`tag-${index}`} tag={tag} index={index} />
                </div>
              ))
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {job?.title && (
                <span className="block font-primary text-2xl font-semibold">
                  {job.title}
                </span>
            )}
            <span className="inline-block font-primary text-4xl font-semibold mb-5">
              {post.title}
            </span>
          </motion.h1>
          <motion.div 
            key={`${'div-body'}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }} 
            className="prose"
          >
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </motion.div>

          {postGalleryUrls && postGalleryUrls.length > 0 && (
            <motion.div 
              key={`${'div-gallery'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold  mt-5 mb-5">Gallery</h2>
              <Gallery images={postGalleryUrls} />
            </motion.div>
          )}

          {job && jobPosts && jobPosts.length > 0 && (
            <motion.div 
              key={`${'div-job'}`} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold  mt-5 mb-2">More from {job.title}...</h2>
              <CategoryScroller title={`From ${job.title} (${job.year})`} items={jobPosts} />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      
    </>
  );
};

export default Project;