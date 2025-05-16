import Link from "next/link";
import { ReactNode } from "react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#393E46] text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-6">
                <div className="text-2xl font-bold mb-8">Admin Panel</div>

                <nav className="flex flex-col gap-4">
                    <Link
                        href="/admin/users"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        👥 Users
                    </Link>
                    <Link
                        href="/admin/courses"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        📚 Courses
                    </Link>
                </nav>

                <div className="mt-auto pt-10">
                    <ClerkLoading>
                        <Loader2 className="animate-spin text-gray-500" />
                    </ClerkLoading>
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl="/" />
                    </ClerkLoaded>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
    );
}
