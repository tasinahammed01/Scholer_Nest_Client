"use client";
import React, { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // You can also use any icon library

export default function Navber() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-5 py-10 relative">
      {/* Logo */}
      <div className="lg:w-[15%] md:w-[35%] ">
        <Image
          src="https://i.ibb.co/WpHvPXkC/Screenshot-508-removebg-preview.png"
          alt="Logo"
          width={200}
          height={50}
        />
      </div>

      {/* Desktop Nav */}
      <div className="w-[70%] hidden lg:block">
        <ul className="flex justify-center items-center gap-10">
          <li className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
            <Link href="/courses">Courses</Link>
          </li>
          <li className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
            <Link href="/live-classes">Live Classes</Link>
          </li>
          <li className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
            <Link href="/ai-chat">Ai Chat</Link>
          </li>
          <li className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
            <Link href="/support">Support</Link>
          </li>
        </ul>
      </div>

      {/* Auth Buttons (Desktop) */}
      <div className="w-[15%] hidden lg:flex justify-center items-center gap-4">
        <SignedOut>
          <div className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
            <SignInButton />
          </div>
          <div className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
            <SignUpButton />
          </div>
        </SignedOut>

        <SignedIn>
          <div className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
            <UserButton />
          </div>
        </SignedIn>
      </div>

      {/* Toggle Button for Mobile */}
      <div className="lg:hidden z-50">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile + tablet Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col justify-center items-center gap-10 z-40 text-2xl">
          <li onClick={() => setMenuOpen(false)} className="cursor-pointer list-none">
            <Link href="/courses">Courses</Link>
          </li>
          <li onClick={() => setMenuOpen(false)} className="cursor-pointer list-none">
            <Link href="/live-classes">Live Classes</Link>
          </li>
          <li onClick={() => setMenuOpen(false)} className="cursor-pointer list-none">
            <Link href="/ai-chat">Ai Chat</Link>
          </li>
          <li onClick={() => setMenuOpen(false)} className="cursor-pointer list-none">
            <Link href="/support">Support</Link>
          </li>

          {/* Auth buttons in mobile */}
          <SignedOut>
            <div className="cursor-pointer" onClick={() => setMenuOpen(false)}>
              <SignInButton />
            </div>
            <div className="cursor-pointer" onClick={() => setMenuOpen(false)}>
              <SignUpButton />
            </div>
          </SignedOut>

          <SignedIn>
            <div className="cursor-pointer" onClick={() => setMenuOpen(false)}>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      )}
    </div>
  );
}
