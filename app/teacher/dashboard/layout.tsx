"use client";

import { BookMarked, CircleUserRound, Menu } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

export default function TeacherLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#222831] pt-30">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 min-h-screen w-[280px] sm:w-64 bg-[#222831] border-r p-4 sm:p-6 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white">Teacher Panel</div>

        <nav className="flex flex-col gap-3 sm:gap-5 text-white">
          <Link
            href="/admin/dashboard/users"
            className="font-medium flex gap-2 sm:gap-3 items-center hover:bg-gray-600 py-2 sm:py-3 px-2 rounded text-sm sm:text-base"
          >
            <CircleUserRound className="w-5 h-5 sm:w-6 sm:h-6" /> <span>Users</span>
          </Link>
          <Link
            href="/teacher/dashboard/courses"
            className="font-medium flex gap-2 sm:gap-3 items-center hover:bg-gray-600 py-2 sm:py-3 px-2 rounded text-sm sm:text-base"
          >
            <BookMarked className="w-5 h-5 sm:w-6 sm:h-6" /> <span>Courses</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar for Mobile */}
        <div className="lg:hidden bg-[#222831] text-white p-3 sm:p-4 flex items-center justify-between border-b">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-base sm:text-lg font-semibold">Teacher Panel</div>
        </div>

        <main className="flex-1 p-4 sm:p-6 overflow-auto text-white">{children}</main>
      </div>
    </div>
  );
}
