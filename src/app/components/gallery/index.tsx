"use client";
import React, { useState } from 'react';

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
        <div className="grid grid-cols-12 gap-4">
            {images.map((image, index) => (
                <div key={index} className="col-span-2 md:col-span-2 pt-2 p-1">
                    <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => openLightbox(index)}
                    />
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