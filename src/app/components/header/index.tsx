"use client";

import logo from "../../assets/img/logo.svg";
import logoMob from "../../assets/img/logo-mob.svg";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const today = new Date();

  return (
    <header
      className={`bg-triangle bg-top bg-repeat-x pt-2 pb-2 pl-10 pr-10 top-0 left-0 right-0 z-10 transition-all`}
    >
    <div className="flex justify-between items-center md:h-20 w-full px-4">
      {/* Navbar Section */}
      <div className="flex justify-center items-center">
      <ul className="hidden lg:flex gap-x-3 font-semibold text-center">
            <li>
            <Link 
                key="nav-1"
                className={pathname == "/" ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                }
                href="/">
                <span>Home</span>
            </Link>
            </li>
            <li>
            <Link 
                key="nav-2"
                className={pathname == "/productions" ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                }
                href="/productions">
                <span>Film & TV</span>
            </Link>
            </li>
            <li>
            <Link 
                key="nav-3"
                className={pathname == "/contact" ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                }
                href="/contact">
                <span>Other Projects</span>
            </Link>
            </li>
        </ul>
      </div>
      
      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <Link href="/" className="flex">
          <Image
            src={logo.src}
            alt="Logo"
            height={100}
            width={600}
            className="hidden md:block inline pt-12 lg:pl-6 lg:pr-6 md:min-w-[500px]"
          />
          <Image
            src={logoMob.src}
            alt="Logo"
            height={200}
            width={200}
            className="block md:hidden inline pt-6 pl-6 pr-6"
          />
        </Link>
      </div>

      {/* Navbar Section */}
      <div className="flex justify-center items-center">
      <ul className="hidden lg:flex font-semibold text-center items-center space-x-4 m-0">
            <li>
            <Link 
                key="nav-1"
                className={pathname == "/" ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                }
                href="/">
                <span>Bookish Things</span>
            </Link>
            </li>
            <li>
            <Link 
                key="nav-2"
                className={pathname == "/productions" ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                }
                href="/productions">
                <span>Theatre Reimagined</span>
            </Link>
            </li>
            <li>
            <Link 
                key="nav-3"
                className={pathname == "/contact" ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                }
                href="/contact">
                <span>Contact</span>
            </Link>
            </li>
        </ul>
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
