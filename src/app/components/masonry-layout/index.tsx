"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from "next/navigation";

import { ArrowRightIcon } from "@radix-ui/react-icons"

type MasonryItem = {
    id: string,
    name: string,
    image: string, 
    url: string,
}

interface MasonryProps {
    posts: MasonryItem[];
    breakpoints?: { [key: number]: number }; // e.g., { 768: 2, 1024: 3 }
}

const MasonryLayout: React.FC<MasonryProps> = ({ posts, breakpoints = { 768: 2, 1024: 3 } }) => {
    const [columns, setColumns] = useState(getColumns(window.innerWidth));

    // Calculate number of columns based on breakpoints
    function getColumns(windowWidth: number): number {
        const sortedBreakpoints = Object.keys(breakpoints)
            .map(Number)
            .sort((a, b) => a - b);

        return sortedBreakpoints.reduce((acc, bp) => (windowWidth >= bp ? breakpoints[bp] : acc), 1);
    }

    useEffect(() => {
        const handleResize = () => setColumns(getColumns(window.innerWidth));
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoints]);

    // Prepare columns as empty arrays
    const columnArrays: MasonryItem[][] = Array.from({ length: columns }, () => []);

    // Distribute images across columns
    posts.forEach((post, index) => {
        columnArrays[index % columns].push(post);
    });

    const router = useRouter();

    return (
        <div className="flex gap-8">
            {columnArrays.map((column, columnIndex) => (
                <div 
                    key={columnIndex} 
                    className="flex-1 space-y-8">
                    {column.map((post, imageIndex) => (
                        <motion.div
                            key={imageIndex}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0}}
                            transition={{ delay: (columnIndex + imageIndex) / 50 }}
                            className="relative group cursor-pointer border-solid border-black border-5 inv-rad-4"

                            onClick={() => router.push(`/${post.url}`)}
                            >
                            <motion.img
                                    whileHover={{
                                        scale: 1.04,
                                        transition: { duration: 0.3 },
                                    }}
                                    whileTap={{ scale: 1 }}
                                    src={post.image}
                                    alt={`${post.name}`}
                                    className="w-full"
                                    layoutId={`${post.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, duration: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <span 
                                    className="pointer-events-none absolute top-1 right-1 p-2  font-semibold rounded-md bg-background-50/90 backdrop-blur-sm backdrop-brightness-10
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {post.name}
                                    <ArrowRightIcon className="inline-block ml-1 mb-1"/>
                                </span>
                        </motion.div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MasonryLayout;
