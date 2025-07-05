"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../assets/img/logo.svg";
import logoMob from "../../assets/img/logo-mob.svg";

import { RxCaretDown, RxCaretUp } from "react-icons/rx";

const getOrdinalSuffix = (n: number): string => {
  if (n > 3 && n < 21) return "th";
  switch (n % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

const formatDateWithSuffix = (date: Date): JSX.Element => {
  const day = date.getDate();
  const ordinal = getOrdinalSuffix(day);
  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const month = date.toLocaleDateString("en-GB", { month: "long" });
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
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (typeof window !== "undefined" && window.navigator.vibrate) {
      window.navigator.vibrate(menuOpen ? 5 : 15);
    }
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => setMenuOpen(false);

  const navLeft = [
    { href: "/", label: "Home" },
    { href: "/productions", label: "Film & TV" },
    { href: "/portfolio", label: "Other Projects" },
  ];

  const navRight = [
    { href: "/coming-soon/bookish-things", label: "Bookish Things" },
    { href: "/coming-soon/theatre-reimagined", label: "Theatre Reimagined" },
    { href: "/contact", label: "Contact" },
  ];

  const renderNavLinks = (links: typeof navLeft, isMob: boolean) =>
    links.map((link, index) => (
      <li key={index}>
        <Link
          href={link.href}
          className={
            pathname === link.href
              ? !isMob
                ? "nav-item nav-item--selected"
                : "nav-item-mob nav-item-mob--selected"
              : !isMob
                ? "nav-item"
                : "nav-item-mob"
          }
          onClick={closeMenu}
        >
          <span>{link.label}</span>
        </Link>
      </li>
    ));

  return (
    <header className="bg-triangle bg-top bg-repeat-x pt-2 pb-2 pl-10 pr-10 top-0 left-0 right-0 z-10 transition-all">
      <div className="flex justify-between items-center md:h-20 w-full px-4">
        {/* Left Nav (Desktop) */}
        <div className="hidden lg:flex justify-center items-center">
          <ul className="flex gap-x-3 font-semibold text-center">
            {renderNavLinks(navLeft, false)}
          </ul>
        </div>

        {/* Logo (Desktop) */}
        <div className="hidden md:flex justify-center items-center">
          <Link href="/" className="flex">
            <Image
              src={logo.src}
              alt="Logo"
              height={100}
              width={600}
              className="pt-12 lg:pl-6 lg:pr-6 md:min-w-[500px]"
            />
          </Link>
        </div>

        {/* Right Nav (Desktop) */}
        <div className="hidden lg:flex justify-center items-center">
          <ul className="flex font-semibold text-center items-center space-x-4 m-0">
            {renderNavLinks(navRight, false)}
          </ul>
        </div>
      </div>

      {/* Logo & Hamburger (Mobile only) */}
      <div className="flex flex-col items-center justify-center md:hidden mt-2">
        <Link href="/" className="flex justify-center">
          <Image
            src={logoMob.src}
            alt="Logo"
            height={200}
            width={200}
            className="pt-6 pl-6 pr-6"
          />
        </Link>
        <button
          className={`focus:outline-none mt-2 z-20 font-semibold rounded bg-[#AAA] ${menuOpen ? `bg-opacity-30` : `bg-opacity-20`} px-2 py-1`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          Menu 
          { !menuOpen && (
            <RxCaretDown className="w-3 h-3 text-black inline-block" />
          )}
          { menuOpen && (
            <RxCaretUp className="w-3 h-3 text-black inline-block" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 px-6 animate-slide-down transition-all duration-300 ease-out">
          <ul className="space-y-1 font-semibold text-center pb-1">
            {renderNavLinks([...navLeft, ...navRight], true)}
          </ul>
        </div>
      )}

      {/* Divider + Date */}
      <div className="mt-10 flex items-center">
        <div className="flex flex-1 h-5 flex-wrap align-top">
          <div className="bg-black h-[3px] m-1 w-full"></div>
          <div className="bg-black h-[3px] m-1 w-full"></div>
        </div>
        <div className="flex flex-shrink-0 mx-4">
          <p className="uppercase font-semibold">
            {formatDateWithSuffix(today)}
          </p>
        </div>
        <div className="flex flex-1 h-5 flex-wrap align-top">
          <div className="bg-black h-[3px] m-1 w-full"></div>
          <div className="bg-black h-[3px] m-1 w-full"></div>
        </div>
      </div>
    </header>
  );
}
