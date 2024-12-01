"use client";
import React from 'react';
import { PortableText, type SanityDocument } from 'next-sanity';
import { motion } from 'motion/react';

const Project = ({ post }: { post: SanityDocument }) => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <motion.div 
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }} className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString('en-GB')}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </motion.div>
    </>
  );
};

export default Project;