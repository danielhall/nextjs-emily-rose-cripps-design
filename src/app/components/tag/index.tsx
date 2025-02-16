'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { type SanityDocument } from 'next-sanity';
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

import { IoPricetagOutline } from "react-icons/io5";

const getLuminance = (hex: string) => {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    // Normalize the RGB values to [0, 1] and calculate luminance
    const a = [r, g, b].map((x) => x / 255).map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
    const luminance = 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    return luminance;
  };

export default function Tag({ tag, index }: { tag: SanityDocument, index: number }) {
    const showTooltipOnLoad: boolean = index === 1;

    const [textColor, setTextColor] = useState('');
    const [showTooltip, setShowTooltip] = useState(showTooltipOnLoad);

    useEffect(() => {
        // Calculate luminance of the background color
        const luminance = getLuminance(tag.color.hex);
        // If luminance is high (bright background), use black text, else use white text
        setTextColor(luminance > 0.5 ? 'text-black' : '');

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
                    className={`px-3 py-1 text-sm font-medium rounded-full m-1 ${textColor} hover:outline hover:outline-2 hover:outline-white hover:outline-offset-2`}
                    style={{ backgroundColor: tag.color.hex }}
                    >
                    <IoPricetagOutline className="inline-block mb-1" /> {tag.title}
                    </motion.span>
                </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
            <Tooltip.Content sideOffset={10}>
                <motion.div
                className="px-2 py-1 text-sm  bg-gray-800 rounded shadow"
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
