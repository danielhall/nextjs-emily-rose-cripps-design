import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Handle animated haptics
  const [animate, setAnimate] = useState(false);

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300); // Reset animation after 300ms
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300); // Reset animation after 300ms
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true
  });

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === lightboxRef.current) {
      onClose();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };

    if (typeof window === "undefined") return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={lightboxRef}
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        {...handlers}
        style={{
          position: "relative",
          maxWidth: "90%",
          maxHeight: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: animate ? "bounce 0.3s ease-in-out" : undefined,
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
        />
      </div>
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        ❯
      </button>

      {/* Add keyframes for bounce animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Lightbox;
