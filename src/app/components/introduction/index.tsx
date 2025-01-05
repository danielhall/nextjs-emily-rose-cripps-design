"use client";

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Image from "next/image";

import EmilyImage from "../../assets/img/emily.jpeg";

import { IoMdHand } from "react-icons/io";

const AnimatedHandIcon = () => {
  const controls = useAnimation();

  useEffect(() => {
    const animation = async () => {
      while (true) { 
        await controls.start({
          x: 2, 
          y: -1, 
          rotate: 1, 
          transition: { duration: 0.5 }, 
        });
        await controls.start({
          x: -2, 
          y: 1, 
          rotate: -1, 
          transition: { duration: 0.5 }, 
        });
      }
    };

    animation();
  }, [controls]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="bg-primary rounded-xl grid grid-cols-12 mb-6 text-black">
      <div className="col-span-1 p-5">
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
              {/* Use Radix Icon */}
              <IoMdHand className="text-yellow-500 w-12 h-12" />

              {/* Or use Font Awesome Icon */}
              {/* <FontAwesomeIcon icon="hand-point-right" className="text-blue-500 w-6 h-6" /> */}
            </motion.div>
          </div>
        </div>
        

      </div>
      <div className="col-span-9 pt-5 pl-6">
        <h1 className="font-secondary text-lg mb-2">Hi, i&apos;m Emily!</h1>
        <p>I&apos;m a multi-disciplined graphic designer focussing in the field Graphic Design for film, television.</p>
        <p>Welcome to my portfolio. Don&apos;t hesitate to react out if you&apos;re interested in working together.</p>
      </div>

    </motion.div>
    
  );
};

export default AnimatedHandIcon;