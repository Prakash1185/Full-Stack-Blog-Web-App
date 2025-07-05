"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/category", label: "Category" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="bg-secondary-background py-3.5 px-4 md:px-16 border-b-4 border-border flex items-center justify-between w-full z-20 fixed top-0">
        <div className="flex items-center gap-5">
          {/* Logo */}
          <div>
            <Link href={"/"}>
              <h1 className="text-3xl md:text-4xl font-bold">Wryto</h1>
            </Link>
          </div>

          {/* Desktop Separator */}
          <div className="hidden md:block w-[1px] h-8 bg-border dark:bg-foreground"></div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href={"/login"}>
            <Button className="text-lg cursor-pointer">Login</Button>
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <ModeToggle />
          <Button variant="" size="" onClick={toggleDrawer} className="p-3 ">
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed top-[73px] left-0 w-full bg-secondary-background border-b-4 border-border z-10 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            <div className="flex justify-center gap-6 sm:gap-8 mb-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={closeDrawer}
                  className=" hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Login Button */}
            <Link href={"/login"} onClick={closeDrawer} className="block">
              <Button className="w-full text-lg py-3 cursor-pointer">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
