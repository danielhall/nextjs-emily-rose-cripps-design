"use client";
import React from 'react';
import { PortableText, type SanityDocument } from 'next-sanity';
import { motion } from 'motion/react';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

import Tag from '../tag'

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const Project = ({ post }: { post: SanityDocument }) => {
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(700).url()
    : null;

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
                <Tag key={`tag-${index}`} tag={tag} index={index} />
              ))
            )}
          </motion.div>

          <motion.h1 
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      layoutId={`title-${post.id}`}
            className="font-secondary text-4xl font-bold mb-8">
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block"
            >
              {post.title}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-primary">
              .
            </motion.span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} className="prose text-white">
            {Array.isArray(post.body) && <PortableText value={post.body} />}

          </motion.div>
        </div>
      </div>

      
    </>
  );
};

export default Project;