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
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index / 50 }}
        key={post._id}>
        <Link href={`/${post.slug.current}`}>
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
                  className="rounded-xl shadow-lg pointer-events-none"
                />
                <span
                  className="pointer-events-none absolute bottom-0 left-0 pt-2 pb-3 pl-3 pr-3  font-secondary rounded-xl rounded-tl-none rounded-br-none bg-background-50/90 backdrop-blur-sm backdrop-brightness-50">
                  {post.title}
                </span>
              </div>
            </motion.div>
          )}
        </Link>
      </motion.div>
    </>
  );
};

export default ProjectCard;