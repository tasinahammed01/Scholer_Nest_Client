"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function Navber() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!navRef.current) return;

      if (currentScrollY > lastScrollY.current) {
        // Scroll Down -> hide navbar
        gsap.to(navRef.current, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // Scroll Up -> show navbar
        gsap.to(navRef.current, {
          y: "0%",
          duration: 0.5,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDashboardClick = () => {
    if (!mounted || !isLoaded) return;

    const role = user?.publicMetadata?.role;
    if (!role) return;

    const dashboardMap = {
      admin: "/admin/dashboard",
      teacher: "/teacher/dashboard",
      student: "/student/dashboard",
    };

    const path = dashboardMap[role as keyof typeof dashboardMap] || "/";
    router.push(path);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-lg transition-all"
    >
      <div className="flex justify-between items-center md:px-10 py-8 ">
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
              <Link href="/">Home</Link>
            </li>
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
        <div className="w-[15%] hidden lg:flex justify-end items-center gap-4">
          <SignedOut>
            <div className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
              <SignInButton />
            </div>
            <div className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
              <SignUpButton />
            </div>
          </SignedOut>

          <SignedIn>
            <button
              onClick={handleDashboardClick}
              className="text-white border px-3 py-1 rounded hover:bg-white hover:text-black transition"
            >
              Dashboard
            </button>
            <UserButton />
          </SignedIn>
        </div>

        {/* Toggle Button & UserButton for Mobile/Tablet */}
        <div className="lg:hidden  flex items-center gap-4">
          <div className="z-30">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          <button className="z-50" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile + Tablet Menu */}
        {menuOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col justify-center items-center gap-10 z-40 text-2xl">
            <li
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer list-none"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer list-none"
            >
              <Link href="/courses">Courses</Link>
            </li>
            <li
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer list-none"
            >
              <Link href="/live-classes">Live Classes</Link>
            </li>
            <li
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer list-none"
            >
              <Link href="/ai-chat">Ai Chat</Link>
            </li>
            <li
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer list-none"
            >
              <Link href="/support">Support</Link>
            </li>

            {/* Auth buttons in mobile menu */}
            <SignedOut>
              <div
                className="cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                <SignInButton />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                <SignUpButton />
              </div>
            </SignedOut>

            <SignedIn>
              <button
                onClick={() => {
                  handleDashboardClick();
                  setMenuOpen(false);
                }}
                className="bg-blue-600 px-4 py-2 rounded"
              >
                Dashboard
              </button>
            </SignedIn>
          </div>
        )}
      </div>
    </div>
  );
}
