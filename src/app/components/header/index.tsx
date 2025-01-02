"use client";
import { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import Image from "next/image";
import Navbar from "../navbar";
import Link from "next/link";
import { motion } from "framer-motion"; // Correct import for framer-motion

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`pt-2 pb-2 pl-10 pr-10 fixed top-0 left-0 right-0 bg-background-50/90 backdrop-blur-lg z-10 transition-all ${
        hasScrolled ? "backdrop-brightness-50" : ""
      }`}
    >
      <div className="container h-20 w-full mx-auto">
        <div className="flex justify-between items-center h-full">
          <Link href="/">
            <Image
              src={logo.src}
              alt="Logo"
              width={50}
              height={50}
              className="inline"
            />
            <span className="inline ml-5 font-secondary text-xl align-middle">
              <motion.span
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-block"
                key="emily-rose"
              >
                Emily-Rose
              </motion.span>
              <motion.span
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block"
                key="cripps"
              >
                &nbsp;Cripps
              </motion.span>
              <motion.span
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
                key="design"
              >
                &nbsp;Design
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block text-primary"
                key="full-stop"
              >
                .
              </motion.span>
            </span>
          </Link>
          <Navbar />
        </div>
      </div>
    </header>
  );
}
