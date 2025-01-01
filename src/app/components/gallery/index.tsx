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
        <div style={{ display: "flex", gap: "10px" }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              style={{ width: "100px", cursor: "pointer" }}
              onClick={() => openLightbox(index)}
            />
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