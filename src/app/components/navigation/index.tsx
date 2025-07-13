"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { InstagramLogoIcon } from "@radix-ui/react-icons"

function Navbar() {
  const pathname = usePathname();

  return (
    <div className="inline-block ml-20 font-semibold text-xl">
        <ul className="hidden md:flex gap-x-12 ">
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
                className={pathname == "/portfolio" ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                }
                href="/portfolio">
                <span>Portfolio</span>
            </Link>
            </li>
            <li>
            <Link 
                key="nav-3"
                className={pathname == "/productions" ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                }
                href="/productions">
                <span>Productions</span>
            </Link>
            </li>
            <li>
            <Link 
                key="nav-4"
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
  );
};

export default Navbar;