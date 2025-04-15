"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { InstagramLogoIcon } from "@radix-ui/react-icons"

function Navbar() {
  const pathname = usePathname();

  return (
    <>
        <ul className="hidden md:flex gap-x-6 font-semibold">
            <li>
            <Link 
                key="nav-1"
                className={pathname == "/" ? 
                    "nav-item--selected bg-bookmark" : 
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
                    "nav-item--selected bg-bookmark" : 
                    "nav-item"
                }
                href="/productions">
                <span>Productions</span>
            </Link>
            </li>
            <li>
            <Link 
                key="nav-3"
                className={pathname == "/contact" ? 
                    "nav-item--selected bg-bookmark" : 
                    "nav-item"
                }
                href="/contact">
                <span>Contact</span>
            </Link>
            </li>
            <li>
            <Link key="nav-3" href="https://www.instagram.com/emilyrcrippsdesign/" target="_blank">
                <span><InstagramLogoIcon className="inline-block mb-1"/></span>
            </Link>
            </li>
        </ul>
    </>
  );
};

export default Navbar;