'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";

import ContactForm from '../../components/contact-form';
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
    <>
      <h1 
            className="font-secondary text-4xl font-bold mb-8">
            Contact Me.
          </h1>


        <div className="col-span-6 md:col-span-6 p-6">
          <ContactForm />
        </div>
    </>
    
  );
};

export default AnimatedHandIcon;
