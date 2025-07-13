"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, HamburgerMenuIcon, Cross1Icon, ChevronRightIcon } from "@radix-ui/react-icons";
import { type SanityDocument } from "next-sanity";
import { motion, AnimatePresence } from "motion/react";

function Navigation({ tags, section = "full" }: { tags: SanityDocument[], section?: "left" | "right" | "mobile" | "full" }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  // Filter tags to only show those with displayInMenu: true
  const menuTags = tags.filter(tag => tag.displayInMenu === true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsPortfolioOpen(false);
  };
  const togglePortfolio = () => setIsPortfolioOpen(!isPortfolioOpen);

  // Left section items
  const leftItems = (
    <>
      <li>
        <Link 
          className={pathname == "/" ? 
            "nav-item nav-item--selected" : 
            "nav-item"
          }
          href="/category/tv-and-film-work">
          <span>Film & TV</span>
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
              <span>Other Works</span>
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
              
              {menuTags.map((tag) => (
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
    </>
  );

  // Right section items  
  const rightItems = (
    <>
      <li>
        <Link 
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
          className={pathname == "/contact" ? 
            "nav-item nav-item--selected" : 
            "nav-item"
          }
          href="/contact">
          <span>Contact</span>
        </Link>
      </li>
    </>
  );

  // Render different sections based on prop
  if (section === "left") {
    return (
      <div className="font-semibold text-xl">
        <ul className="flex gap-x-8">
          {leftItems}
        </ul>
      </div>
    );
  }

  if (section === "right") {
    return (
      <div className="font-semibold text-xl">
        <ul className="flex gap-x-8">
          {rightItems}
        </ul>
      </div>
    );
  }

  if (section === "mobile") {
    return (
      <>
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-4 text-black hover:text-gray-600 transition-colors"
          aria-label="Toggle menu"
        >
          <HamburgerMenuIcon className="w-6 h-6" />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={closeMenu}
              />

              {/* Slide-out Menu */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 h-screen w-80 bg-white shadow-xl z-50 overflow-y-auto"
              >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-gray-600 hover:text-black transition-colors"
                    aria-label="Close menu"
                  >
                    <Cross1Icon className="w-5 h-5" />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="p-6">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="/"
                        onClick={closeMenu}
                        className={`block py-3 px-4 rounded-lg text-lg transition-colors ${
                          pathname === "/" 
                            ? "bg-gray-100 text-black font-semibold" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-black"
                        }`}
                      >
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/category/tv-and-film-work"
                        onClick={closeMenu}
                        className={`block py-3 px-4 rounded-lg text-lg transition-colors ${
                          pathname === "/category/tv-and-film-work" 
                            ? "bg-gray-100 text-black font-semibold" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-black"
                        }`}
                      >
                        Film & TV
                      </Link>
                    </li>

                    {/* Portfolio with Submenu */}
                    <li>
                      <div>
                        <button
                          onClick={togglePortfolio}
                          className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-lg transition-colors text-left ${
                            (pathname.startsWith("/portfolio") || pathname.startsWith("/category")) && !pathname.startsWith("/category/tv-and-film-work")
                              ? "bg-gray-100 text-black font-semibold"
                              : "text-gray-700 hover:bg-gray-50 hover:text-black"
                          }`}
                        >
                          Portfolio
                          <motion.div
                            animate={{ rotate: isPortfolioOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRightIcon className="w-5 h-5" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isPortfolioOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 mt-2 space-y-2">
                                <Link
                                  href="/portfolio"
                                  onClick={closeMenu}
                                  className="block py-2 px-4 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                                >
                                  Full Portfolio →
                                </Link>
                                
                                <div className="border-t border-gray-200 pt-2">
                                  {menuTags.map((tag) => (
                                    <Link
                                      key={tag._id}
                                      href={`/category/${tag.slug.current}`}
                                      onClick={closeMenu}
                                      className="block py-2 px-4 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                                    >
                                      {tag.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>

                    <li>
                      <Link
                        href="/productions"
                        onClick={closeMenu}
                        className={`block py-3 px-4 rounded-lg text-lg transition-colors ${
                          pathname === "/productions" 
                            ? "bg-gray-100 text-black font-semibold" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-black"
                        }`}
                      >
                        Productions
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/contact"
                        onClick={closeMenu}
                        className={`block py-3 px-4 rounded-lg text-lg transition-colors ${
                          pathname === "/contact" 
                            ? "bg-gray-100 text-black font-semibold" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-black"
                        }`}
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Default: full navigation (backwards compatibility)
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:inline-block ml-20 font-semibold text-xl">
        <ul className="flex gap-x-12">
          <li>
            <Link 
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
                  
                  {menuTags.map((tag) => (
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

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-10 text-black hover:text-gray-600 transition-colors"
          aria-label="Toggle menu"
        >
          <HamburgerMenuIcon className="w-6 h-6" />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50"
                style={{ zIndex: 99998 }}
                onClick={closeMenu}
              />

              {/* Slide-out Menu */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 w-80 bg-white shadow-xl overflow-y-auto"
                style={{ 
                  position: 'fixed',
                  height: '100vh', 
                  top: 0, 
                  right: 0, 
                  zIndex: 99999,
                  width: '320px'
                }}
              >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-gray-600 hover:text-black transition-colors"
                    aria-label="Close menu"
                  >
                    <Cross1Icon className="w-5 h-5" />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="p-6">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="/"
                        onClick={closeMenu}
                        className={`block py-3 px-4 rounded-lg text-lg transition-colors ${
                          pathname === "/" 
                            ? "bg-gray-100 text-black font-semibold" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-black"
                        }`}
                      >
                        Home
                      </Link>
                    </li>

                    {/* Portfolio with Submenu */}
                    <li>
                      <div>
                        <button
                          onClick={togglePortfolio}
                          className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-lg transition-colors text-left ${
                            pathname.startsWith("/portfolio") || pathname.startsWith("/category")
                              ? "bg-gray-100 text-black font-semibold"
                              : "text-gray-700 hover:bg-gray-50 hover:text-black"
                          }`}
                        >
                          Portfolio
                          <motion.div
                            animate={{ rotate: isPortfolioOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRightIcon className="w-5 h-5" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isPortfolioOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 mt-2 space-y-2">
                                <Link
                                  href="/portfolio"
                                  onClick={closeMenu}
                                  className="block py-2 px-4 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                                >
                                  Full Portfolio →
                                </Link>
                                
                                <div className="border-t border-gray-200 pt-2">
                                  {menuTags.map((tag) => (
                                    <Link
                                      key={tag._id}
                                      href={`/category/${tag.slug.current}`}
                                      onClick={closeMenu}
                                      className="block py-2 px-4 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                                    >
                                      {tag.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>

                    <li>
                      <Link
                        href="/productions"
                        onClick={closeMenu}
                        className={`block py-3 px-4 rounded-lg text-lg transition-colors ${
                          pathname === "/productions" 
                            ? "bg-gray-100 text-black font-semibold" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-black"
                        }`}
                      >
                        Productions
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/contact"
                        onClick={closeMenu}
                        className={`block py-3 px-4 rounded-lg text-lg transition-colors ${
                          pathname === "/contact" 
                            ? "bg-gray-100 text-black font-semibold" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-black"
                        }`}
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Navigation;
