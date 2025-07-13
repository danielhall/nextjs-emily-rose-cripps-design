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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {images.map((image, index) => (
                <motion.div 
                    key={index}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-lg shadow-lg aspect-square group cursor-pointer bg-white"
                    onClick={() => openLightbox(index)}
                >
                    <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    
                    {/* View overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                            <EnterFullScreenIcon className="w-4 h-4" />
                            View
                        </div>
                    </div>
                </motion.div>
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