'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { type SanityDocument } from 'next-sanity';
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "motion/react";

import { IoPricetagOutline } from "react-icons/io5";

export default function Tag({ tag, index }: { tag: SanityDocument, index: number }) {
    const showTooltipOnLoad: boolean = index === 0;
    const [showTooltip, setShowTooltip] = useState(showTooltipOnLoad);

    useEffect(() => {

        if (showTooltipOnLoad) {
            // Show the tooltip with a delay on page load
            const showTimeout = setTimeout(() => setShowTooltip(true), 500); // 500ms delay to show
            const hideTimeout = setTimeout(() => setShowTooltip(false), 10000); // 3s delay to hide
      
            // Cleanup timeouts
            return () => {
              clearTimeout(showTimeout);
              clearTimeout(hideTimeout);
            };
          }
    }, [tag.color.hex, showTooltipOnLoad]);

    return (
        <>
        <Tooltip.Provider>
        <Tooltip.Root open={showTooltip}>
            <Tooltip.Trigger asChild>
                <Link 
                    key={`tag-link-${index}`} 
                    href={`/category/${tag.slug.current}`}>
                    <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (index/10) }}
                    key={`tag-${index}`}
                    className={`focus:outline-none m-x-2 m-y-4 z-20 p-1 font-semibold rounded bg-[#AAA] bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-20`}
                    >
                    <IoPricetagOutline className="inline-block mb-1" /> {tag.title}
                    </motion.span>
                </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
            <Tooltip.Content sideOffset={10}>
                <motion.div
                className="px-2 py-1 text-sm text-white bg-gray-800 rounded shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                >
                Browse by tag
                <Tooltip.Arrow className="fill-gray-800" />
                </motion.div>
            </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
        </Tooltip.Provider>
        </>
        
  );
}
