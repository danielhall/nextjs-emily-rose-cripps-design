"use client";

import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../navigation";


export default function Header({ tags }: { tags: SanityDocument[] }) {
  return (
    <header className="container mx-auto sm:p-0 my-10">
      <div className="flex items-center justify-between">
        {/* Left Navigation Section - Desktop Only */}
        <div className="hidden md:flex flex-1 justify-start">
          <Navigation tags={tags} section="left" />
        </div>
        
        {/* Centered Logo */}
        <div className="flex-grow md:flex-grow-0 flex justify-center md:justify-center">
          <Link href="/" className="block">
            <Image
              src="/assets/img/emily-rose-logo.svg"
              alt="Emily-Rose Cripps"
              width={500}
              height={150}
              priority
              className="w-auto h-32 md:h-32"
            />
          </Link>
        </div>
        
        {/* Right Navigation Section - Desktop Only */}
        <div className="hidden md:flex flex-1 justify-end">
          <Navigation tags={tags} section="right" />
        </div>
        
        {/* Mobile Navigation - Normal flow positioning */}
        <div className="md:hidden flex-shrink-0">
          <Navigation tags={tags} section="mobile" />
        </div>
      </div>
    </header>
  );
}
