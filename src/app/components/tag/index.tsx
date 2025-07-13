'use client';
import Link from "next/link";
import { type SanityDocument } from 'next-sanity';
import { motion } from "motion/react";

import { IoPricetagOutline } from "react-icons/io5";

export default function Tag({ tag, index }: { tag: SanityDocument, index: number }) {
    return (
        <>
            <Link
                key={`tag-link-${index}`}
                href={`/category/${tag.slug.current}`}>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (index / 10) }}
                    key={`tag-${index}`}
                    className={`focus:outline-none m-x-2 m-y-4 z-20 p-1 font-semibold rounded bg-[#AAA] bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-20`}
                >
                    <IoPricetagOutline className="inline-block mb-1" /> {tag.title}
                </motion.span>
            </Link>
        </>

    );
}
