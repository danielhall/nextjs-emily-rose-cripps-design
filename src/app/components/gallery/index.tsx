"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';

import Lightbox from "../lightbox";

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
        <div className="grid grid-cols-12 gap-4 mb-5">
            {images.map((image, index) => (
                <div key={index} className="col-span-2 md:col-span-2 pt-2 p-1">
                    <motion.div 
                        whileHover={{
                            scale: 1.04,
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 1 }}
                        className="w-56 h-56 overflow-hidden rounded-xl shadow-md">
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            style={{ cursor: "pointer" }}
                            className={"w-full h-full object-cover"}
                            onClick={() => openLightbox(index)}
                        />
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