"use client";

import logo from "../../assets/img/logo.svg";
import Image from "next/image";
import Navbar from "../navigation";
import Link from "next/link";

import { CgEditBlackPoint } from "react-icons/cg";


const getOrdinalSuffix = (n: number): string => {
  if (n > 3 && n < 21) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const formatDateWithSuffix = (date: Date): JSX.Element => {
  const day = date.getDate();
  const ordinal = getOrdinalSuffix(day);

  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  const year = date.getFullYear();

  return (
    <>
      {weekday}, {month} {day}
      <sup className="lowercase">{ordinal}</sup> {year}
    </>
  );
};

export default function Header() {
  const today = new Date();

  return (
    <header
      className={`bg-triangle bg-top bg-repeat-x pt-2 pb-2 pl-10 pr-10 top-0 left-0 right-0 z-10 transition-all`}
    >
    <div className="flex justify-between items-center h-20 w-full px-4">
      {/* Navbar Section */}
      <div className="flex justify-center items-center">
        <Navbar />
      </div>
      
      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <Link href="/" className="flex">
          <Image
            src={logo.src}
            alt="Logo"
            height={100}
            width={1000}
            className="inline pt-12 pl-6 pr-6"
          />
        </Link>
      </div>

      {/* Navbar Section */}
      <div className="flex justify-center items-center">
        <Navbar />
      </div>
    </div>

    <div className="mt-10 flex items-center">
      {/* Left line */}
      <div className="flex flex-1 h-5 flex-wrap align-top">
        <div className="bg-black h-[3px] m-1 w-full"></div>
        <div className="bg-black h-[3px] m-1 w-full"></div>
      </div>

      {/* Date */}
      <div className="flex flex-shrink-0 mx-4">
        <p className="uppercase font-semibold">{formatDateWithSuffix(today)}</p>
      </div>

      {/* Right line */}
      <div className="flex flex-1 h-5 flex-wrap align-top">
        <div className="bg-black h-[3px] m-1 w-full"></div>
        <div className="bg-black h-[3px] m-1 w-full"></div>
      </div>
    </div>



    

    </header>
  );
}
