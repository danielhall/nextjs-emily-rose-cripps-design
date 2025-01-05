"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';

import Lightbox from "../lightbox";

import { EnterFullScreenIcon } from "@radix-ui/react-icons"

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
  
    const openLightbox = (index: number) => {
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    };
  
    return (
      <div>
        <div className="grid grid-cols-12 gap-1 mb-5">
            {images.map((image, index) => (
                <div key={index} className="col-span-3 md:col-span-3 pt-2 p-1">
                    <motion.div 
                        whileHover={{
                            scale: 1.04,
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 1 }}
                        className="h-40 overflow-hidden rounded-md shadow-md relative group cursor-pointer">
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            style={{ cursor: "pointer" }}
                            className={"w-full h-full object-cover"}
                            onClick={() => openLightbox(index)}
                        />
                        <span 
                            className="pointer-events-none absolute top-1 right-1 p-2 text-white font-semibold rounded-md bg-background-50/90 backdrop-blur-sm backdrop-brightness-50
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View
                            <EnterFullScreenIcon className="inline-block ml-1 mb-1"/>
                        </span>
                    </motion.div>
                    
                </div>
            ))}
        </div>
        {isLightboxOpen && (
          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}
      </div>
    );
};

export default Gallery;