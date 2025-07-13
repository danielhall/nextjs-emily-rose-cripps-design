"use client";

import { motion } from 'motion/react';
import Image from "next/image";

import EmilyImage from "../../assets/img/emily.jpeg";

const Introduction = () => {
  return (
    <motion.div 
      layoutId={`contact-me`}
      className="bg-primary rounded-lg grid grid-cols-12 mb-6 text-black px-3 py-10 md:py-3 items-center"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
      <motion.div layout className="col-span-2 flex justify-center items-center md:p-10">
        <div className="relative">
          <Image
            src={EmilyImage.src}
            alt="Logo"
            height={200}
            width={200}
            className="inline rounded-full shadow-lg"
          />
        </div>
      </motion.div>
      <motion.div layout className="col-span-8 flex flex-col justify-center pl-6">
        <h1 className="font-primary text-3xl font-bold mb-4">Hi, I&apos;m Emily!</h1>
        <p className="mb-3">I&apos;m a multi-disciplined graphic designer focusing in the field of graphic design for film and television.</p>
        <p>Welcome to my portfolio. Don&apos;t hesitate to reach out if you&apos;re interested in working together.</p>
      </motion.div>
    </motion.div>
  );
};

export default Introduction;
