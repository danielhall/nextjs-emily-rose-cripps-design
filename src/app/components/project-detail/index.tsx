"use client";
import React from 'react';
import { PortableText, type SanityDocument } from 'next-sanity';
import { motion } from 'motion/react';
import Tag from '../tag'

const Project = ({ post }: { post: SanityDocument }) => {
  return (
    <>
      <motion.div 
        className="float-right">
        {post.tags && (
          post.tags.map((tag: SanityDocument, index: number) => (
            <Tag key={`tag-${index}`} tag={tag} index={index} />
          ))
        )}
      </motion.div>

      <h1 className="font-secondary text-4xl font-bold mb-8">
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
      </h1>
      <motion.div 
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }} className="prose text-white">
        {Array.isArray(post.body) && <PortableText value={post.body} />}

      </motion.div>
    </>
  );
};

export default Project;