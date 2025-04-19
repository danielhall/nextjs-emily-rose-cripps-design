"use client";

import logo from "../../assets/img/logo.svg";
import Image from "next/image";
import Navbar from "../navigation";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className={`pt-2 pb-2 pl-10 pr-10 top-0 left-0 right-0 z-10 transition-all`}
    >
    <div className="flex justify-between items-center h-20 w-full px-4">
      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <Link href="/" className="flex">
          <Image
            src={logo.src}
            alt="Logo"
            height={100}
            width={1000}
            className="inline pt-12 pl-6"
          />
        </Link>
      </div>

      {/* Navbar Section */}
      <div className="flex justify-center items-center">
        <Navbar />
      </div>
    </div>


    </header>
  );
}
