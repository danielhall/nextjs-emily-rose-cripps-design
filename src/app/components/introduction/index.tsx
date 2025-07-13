"use client";

import { motion } from 'motion/react';
import Image from "next/image";

import EmilyImage from "../../assets/img/emily.jpeg";

const Introduction = () => {
  return (
    <motion.div 
      layoutId={`contact-me`}
      className="bg-primary rounded-lg grid grid-cols-12 mb-6 text-black p-6"
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

export default Introduction;
