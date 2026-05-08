"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  BookOpen,
  Trophy,
  User,
  Flame,
  LogOut,
} from "lucide-react";

import {
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: House,
  },
  {
    name: "Learn",
    href: "/learn",
    icon: BookOpen,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-72 flex-col border-r border-gray-200 bg-white px-6 py-8">
      {/* TOP */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-green-500">
          DuoCode
        </h1>

        <div className="mt-12 space-y-3">
          {links.map((link) => {
            const Icon = link.icon;

            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  flex items-center gap-4 rounded-2xl px-5 py-4 text-lg font-medium transition-all duration-200
                  
                  ${
                    active
                      ? "bg-green-500 text-white shadow-lg shadow-green-200"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                  }
                `}
              >
                <Icon size={24} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* STREAK CARD */}
      <div className="mt-auto">
        

        {/* PROFILE SECTION */}
        <div className="mt-6 rounded-3xl border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/sign-in" />

            <div>
              <p className="font-semibold text-gray-900">
                Your Profile
              </p>

              <p className="text-sm text-gray-500">
                Manage account
              </p>
            </div>
          </div>

          <SignOutButton>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-100">
              <LogOut size={18} />
              Logout
            </button>
          </SignOutButton>
        </div>
      </div>
    </aside>
  );
}