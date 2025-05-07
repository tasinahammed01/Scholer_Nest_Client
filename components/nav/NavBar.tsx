"use client";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from '../ThemeToggle'

export default function Navbar() {
  const auth = useAuth();
  const role =
    auth?.user && (auth.role === "student" || auth.role === "teacher" || auth.role === "admin")
      ? auth.role
      : "student";
  const [isOpen, setIsOpen] = useState(false);

  // Default to student navbar
  const navLinks = {
    student: [
      { name: "Home", href: "/" },
      { name: "Courses", href: "/courses" },
      { name: "Dashboard", href: "/dashboard/student" },
      { name: "AI Voice Q&A", href: "/ai/voice-qa" },
      { name: "3D Content", href: "/visual/3d-content" },
    ],
    teacher: [
      { name: "Home", href: "/" },
      { name: "My Classes", href: "/dashboard/teacher" },
      { name: "Upload Content", href: "/teacher/upload" },
    ],
    admin: [
      { name: "Home", href: "/" },
      { name: "Admin Panel", href: "/dashboard/admin" },
      { name: "Manage Users", href: "/admin-panel" },
    ],
  };

  const currentRole: keyof typeof navLinks = role || "student";
  const links = navLinks[currentRole];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto md:px-4 px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-200">
            EdTech
          </Link>

          {/* Centered Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center space-x-6 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            
            {auth?.user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User avatar"
                      src={auth.user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li>
                    <a className="justify-between text-gray-700 dark:text-gray-100">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a className="text-gray-700 dark:text-gray-100">Settings</a></li>
                  <li><a className="text-gray-700 dark:text-gray-100">Logout</a></li>
                </ul>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/auth/login" className="btn btn-ghost text-gray-700 dark:text-white">Login</Link>
                <Link href="/auth/register" className="btn btn-primary">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 transition-colors duration-200">
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 px-4 flex flex-col justify-center items-center space-y-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-lg text-center"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 space-y-4 flex flex-col items-center">
                {auth?.user ? (
                  <div className="dropdown dropdown-end w-full">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-full">
                      <div className="w-10 rounded-full">
                        <img
                          alt="User avatar"
                          src={auth.user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow">
                      <li>
                        <a className="justify-between text-gray-700 dark:text-gray-100">
                          Profile
                          <span className="badge">New</span>
                        </a>
                      </li>
                      <li><a className="text-gray-700 dark:text-gray-100">Settings</a></li>
                      <li><a className="text-gray-700 dark:text-gray-100">Logout</a></li>
                    </ul>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link href="/auth/login" className="btn btn-ghost w-full text-gray-700 dark:text-white">Login</Link>
                    <Link href="/auth/register" className="btn btn-primary w-full">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
