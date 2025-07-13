"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@radix-ui/react-icons";

type GridItem = {
    id: string;
    name: string;
    image: string;
    url: string;
    description: string;
}

interface GridLayoutProps {
    posts: GridItem[];
}

const GridLayout: React.FC<GridLayoutProps> = ({ 
    posts
}) => {
    const router = useRouter();

    return (
        <div className="mx-4 md:mx-0">
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group cursor-pointer"
                        onClick={() => router.push(`/${post.url}`)}
                    >
                        {/* Image Container */}
                        <div className="relative overflow-hidden border border-double border-black border-[3px] aspect-square mb-3">
                            <motion.img
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.3 },
                                }}
                                whileTap={{ scale: 1 }}
                                src={post.image}
                                alt={post.name}
                                className="w-full h-full object-cover bg-black"
                                layoutId={post.id}
                            />
                            
                            {/* Overlay with "See work" text */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-3 
                                    transform translate-y-full group-hover:translate-y-0 
                                    transition-transform duration-300 ease-out
                                    bg-gradient-to-t from-black/80 to-transparent">
                                    <span className="text-white font-semibold text-sm md:text-base flex items-center justify-center">
                                        See work
                                        <ArrowRightIcon className="ml-2 w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Title and Description */}
                        <div className="space-y-2">
                            <h3 className="font-semibold text-sm md:text-base leading-tight overflow-hidden" 
                                style={{ 
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical' as const
                                }}>
                                {post.name}
                            </h3>
                            {post.description && (
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed overflow-hidden"
                                   style={{ 
                                       display: '-webkit-box',
                                       WebkitLineClamp: 3,
                                       WebkitBoxOrient: 'vertical' as const
                                   }}>
                                    {post.description}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default GridLayout;
