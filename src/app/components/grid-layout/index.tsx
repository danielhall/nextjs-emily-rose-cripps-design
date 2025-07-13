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
}

interface GridLayoutProps {
    posts: GridItem[];
}

const GridLayout: React.FC<GridLayoutProps> = ({ 
    posts
}) => {
    const router = useRouter();

    return (
        <div className="grid gap-6 auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group cursor-pointer"
                    onClick={() => router.push(`/${post.url}`)}
                >
                    <div className="relative overflow-hidden border border-double border-black border-[3px] aspect-square">
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
                        
                        {/* Overlay with project name */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4 
                                transform translate-y-full group-hover:translate-y-0 
                                transition-transform duration-300 ease-out
                                bg-gradient-to-t from-black/80 to-transparent">
                                <span className="text-white font-semibold text-lg flex items-center">
                                    {post.name}
                                    <ArrowRightIcon className="ml-2 w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default GridLayout;
