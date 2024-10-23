"use client";

import Link from "next/link";
import { useState } from "react";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Shapes, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { href: "#features", label: "Features" },
    { href: "#benefits", label: "Benefits" },
    { href: "#cta", label: "Get Started" },
  ];

  return (
    <header className="relative z-10">
      <nav className="flex flex-row items-center justify-between px-4 py-4 md:px-12 md:py-6">
        <Link href="/dashboard" className="flex items-center justify-center">
          <div className="relative mr-4 h-8 w-8">
            <Shapes className="absolute h-full w-full text-primary" />
          </div>
          <h1 className="text-lg font-bold md:text-2xl">TaskQuill</h1>
        </Link>

        <div className="hidden flex-row items-center justify-between space-x-8 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-bold text-gray-600 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center space-x-4 md:flex">
          <SignedIn>
            <Link href="/dashboard">
              <Button className="rounded-full px-6">Dashboard</Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <Button className="rounded-full px-6">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline" className="rounded-full px-6">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full bg-white px-4 py-4 shadow-md md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900"
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
              <SignedIn>
                <Link href="/dashboard" onClick={toggleMenu}>
                  <Button className="w-full rounded-full px-6">
                    Dashboard
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in" onClick={toggleMenu}>
                  <Button className="w-full rounded-full px-6">Sign In</Button>
                </Link>
                <Link href="/sign-up" onClick={toggleMenu}>
                  <Button
                    variant="outline"
                    className="w-full rounded-full px-6"
                  >
                    Sign Up
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
