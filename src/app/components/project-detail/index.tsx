"use client";
import React from 'react';
import { PortableText, type SanityDocument } from 'next-sanity';
import { motion } from 'motion/react';
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
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 md:col-span-6 p-2">
          {postImageUrl && (
            <motion.img
              layoutId={`${post._id}`}
              src={postImageUrl}
              alt={post.title}
              className="rounded-xl shadow-md"
              width="700"

              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
        <div className="col-span-6 md:col-span-6 p-2">
          <motion.div 
            className="float-right">
            {post.tags && (
              post.tags.map((tag: SanityDocument, index: number) => (
                <div className="inline-block p-1" key={`tag-${index}`}>
                  <Tag key={`tag-${index}`} tag={tag} index={index} />
                </div>
              ))
            )}
          </motion.div>

          <h1>
            {job?.title && (
                <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="block font-primary text-2xl font-bold">
                  {job.title}
                </motion.span>

            )}
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block font-primary text-4xl font-bold mb-5"
            >
              {post.title}
            </motion.span>
          </h1>
          <motion.div 
            key={`${'div-body'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="prose ">
            {Array.isArray(post.body) && <PortableText value={post.body} />}

          </motion.div>

          {postGalleryUrls && postGalleryUrls.length > 0 && (
            <motion.div 
              key={`${'div-gallery'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-semibold  mt-5 mb-5">Gallery</h2>
              <Gallery images={postGalleryUrls} />
            </motion.div>
          )}

          {job && jobPosts && jobPosts.length > 0 && (
            <motion.div 
              key={`${'div-job'}`} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-semibold  mt-5 mb-2">More from {job.title}...</h2>
              <CategoryScroller title={`From ${job.title} (${job.year})`} items={jobPosts} />
            </motion.div>
          )}
        </div>
      </div>

      
    </>
  );
};

export default Project;