"use client";

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";

import EmilyImage from "../../assets/img/emily.jpeg";

import { IoMdHand } from "react-icons/io";

const AnimatedHandIcon = () => {
  const controls = useAnimationControls();
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isMounted, setIsMounted] = useState(false); 
  const pathName = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const startAnimation = () => {
      const animation = async () => {
        try {
          while (pathName === '/') { // Check isMounted within the loop
            if (controls 
              && typeof controls.start === 'function'
              && pathName === '/') { 
              await controls.start({
                x: 2, 
                y: -1, 
                rotate: 1, 
                transition: { duration: 0.5 }, 
              });
              await controls.start({
                x: -2, 
                y: 1, 
                rotate: -4, 
                transition: { duration: 0.5 }, 
              });
            }
          }
        }
        catch {

        }
        
      };

      animation();
    };

    // Delay the animation start by a small amount (e.g., 100ms)
    setTimeout(() => {
      if (controls && typeof controls.start === 'function') { 
        startAnimation();
      }
    }, 100); 

    return () => {
      setIsMounted(false); 
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      controls.stop(); 
    };
  }, [controls, isMounted, pathName]);

  return (
    <motion.div 
      layoutId={`contact-me`}
      className="bg-primary rounded-lg grid grid-cols-12 mb-6 text-black"
      style={{
        position: 'relative',
        overflow: 'hidden',
        clipPath: 'inset(0 round 0.75rem)', // Clip-path applied here too
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
      <motion.div layout className="col-span-1 p-5">
        <div className="relative">
          <Image
            src={EmilyImage.src}
            alt="Logo"
            height={100}
            width={100}
            className="inline rounded-full shadow-lg"
          />
          <div className="absolute bottom-0 left-0">
            <motion.div 
              animate={controls} 
              className="inline-flex items-center justify-center"
            >
              <IoMdHand className="text-yellow-500 w-12 h-12" />
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div layout className="col-span-9 pt-5 pl-6">
        <h1 className="font-primary text-lg mb-2">Hi, I&apos;m Emily!</h1>
        <p>I&apos;m a multi-disciplined graphic designer focusing in the field of graphic design for film and television.</p>
        <p>Welcome to my portfolio. Don&apos;t hesitate to reach out if you&apos;re interested in working together.</p>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedHandIcon;
