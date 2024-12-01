"use client";
import React from 'react';
import Link from "next/link";
import { type SanityDocument } from 'next-sanity';
import { motion } from 'motion/react';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) => 
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const ProjectCard = ({ post, index }: { post: SanityDocument, index: number }) => {
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(400).url()
    : null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index/50 }}
        key={post._id}>
            <Link className="hover:underline" href={`${post.slug.current}`}>
                {postImageUrl && (
                    <motion.div
                            whileHover={{
                                scale: 1.04,
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 1 }}
                            className="relative">
                        <div className="static">
                            <img
                                src={postImageUrl}
                                alt={post.title}
                                width="400"
                                className="rounded-xl shadow-lg"
                            />
                            <span className="absolute bottom-3 left-3 pt-2 pb-2 pl-2 pr-2 text-white font-semibold rounded-xl bg-background-50/90 backdrop-blur-lg backdrop-brightness-50">{post.title}</span>
                        </div>
                    </motion.div>
                )}
                <div className="mt-6 hidden">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p>{new Date(post.publishedAt).toLocaleDateString("en-GB")}</p>
                </div>
            </Link>
        </motion.div>
    </>
  );
};

export default ProjectCard;