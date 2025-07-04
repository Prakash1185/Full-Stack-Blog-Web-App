import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="bg-secondary-background py-3.5 px-16 border-b-4 border-border  flex items-center justify-between w-full z-20 fixed top-0">
      <div className="flex items-center gap-5">
        {/* Logo */}
        <div>
          <h1 className="text-4xl">Wryto</h1>
        </div>
        <div className="w-[1px] h-8 bg-border dark:bg-foreground"></div>
        {/* links */}
        <ul className="space-x-4">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Blogs</Link>
          <Link href={"/"}>Category</Link>
          <Link href={"/"}>Contact</Link>
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Link href={"/login"}>
          <Button className="text-lg">Login</Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
