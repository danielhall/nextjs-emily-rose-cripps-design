"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [selectedIndex, images.length]);

  const showPrevious = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  }, [selectedIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (event.key === 'ArrowRight') showNext();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showNext, showPrevious]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {images.map((src, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          onClick={() => openLightbox(index)}
          className="cursor-pointer overflow-hidden rounded-lg"
        >
          <Image
            src={src}
            alt={`Thumbnail ${index + 1}`}
            width={200}
            height={200}
            className="object-cover"
          />
        </motion.div>
      ))}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          >
            <div className="relative">
              {/* Image */}
              <motion.div
                key={images[selectedIndex]}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh]"
              >
                <Image
                  src={images[selectedIndex]}
                  alt={`Full-size ${selectedIndex + 1}`}
                  width={800}
                  height={800}
                  className="object-contain"
                />
              </motion.div>

              {/* Navigation Buttons */}
              <button
                onClick={showPrevious}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
              >
                ‹
              </button>
              <button
                onClick={showNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
              >
                ›
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;