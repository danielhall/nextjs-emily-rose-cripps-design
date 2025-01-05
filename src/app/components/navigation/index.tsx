"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { InstagramLogoIcon, EnvelopeClosedIcon, HomeIcon, RocketIcon } from "@radix-ui/react-icons"

function Navbar() {
  const pathname = usePathname();

  return (
    <>
        <ul className="hidden md:flex gap-x-6 font-semibold">
            <li>
            <Link 
                key="nav-1"
                className={pathname == "/" ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                }
                href="/">
                <span><HomeIcon className="inline-block mb-1"/> <span className="inline-block pl-1">Home</span></span>
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
                <span><RocketIcon className="inline-block mb-1"/> <span className="inline-block pl-1">Productions</span></span>
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
                <span><EnvelopeClosedIcon className="inline-block mb-1"/> <span className="inline-block pl-1">Contact</span></span>
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