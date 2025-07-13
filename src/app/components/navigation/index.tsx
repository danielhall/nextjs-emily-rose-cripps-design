"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { type SanityDocument } from "next-sanity";

function Navigation({ tags }: { tags: SanityDocument[] }) {
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
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className={`${pathname.startsWith("/portfolio") || pathname.startsWith("/category") ? 
                    "nav-item nav-item--selected" : 
                    "nav-item"
                  } flex items-center gap-1 bg-transparent border-none cursor-pointer`}
                >
                  <span>Portfolio</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50"
                  sideOffset={5}
                >
                  <DropdownMenu.Item asChild>
                    <Link 
                      href="/portfolio" 
                      className="flex items-center justify-between px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer outline-none"
                    >
                      Full Portfolio
                      <span className="text-gray-400">→</span>
                    </Link>
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                  
                  {tags.map((tag) => (
                    <DropdownMenu.Item key={tag._id} asChild>
                      <Link 
                        href={`/category/${tag.slug.current}`}
                        className="block px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer outline-none"
                      >
                        {tag.title}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
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

export default Navigation;