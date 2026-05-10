"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useState } from "react";

import {
  House,
  BookOpen,
  Trophy,
  User,
  LogOut,
  Menu,
  X,
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

  const [open, setOpen] =
    useState(false);

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 bg-white px-5 py-4 md:hidden">
        {/* LOGO */}
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="flex items-center gap-3"
        >
          <Menu className="text-green-500" />

          <h1 className="text-3xl font-extrabold text-green-500">
            DuoCode
          </h1>
        </button>

        <UserButton />
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-gray-200 bg-white px-6 py-8 transition-transform duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >
        {/* TOP */}
        <div>
          {/* HEADER */}
          <div className="flex-responsive">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-green-500">
              DuoCode
            </h1>

            {/* CLOSE BUTTON */}
            <button
              onClick={() =>
                setOpen(false)
              }
              className="md:hidden"
            >
              <X className="text-gray-500" />
            </button>
          </div>

          {/* NAVIGATION */}
          <div className="mt-12 space-y-3">
            {links.map((link) => {
              const Icon = link.icon;

              const active =
                pathname ===
                link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() =>
                    setOpen(false)
                  }
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

                  <span>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* PROFILE */}
        <div className="mt-auto">
          <div className="rounded-3xl border border-gray-200 p-4">
            <div className="flex items-center gap-4">
              <UserButton />

              <div>
                <p className="font-semibold text-gray-900">
                  Your Profile
                </p>

                <p className="text-sm text-gray-500">
                  Manage account
                </p>
              </div>
            </div>

            <SignOutButton redirectUrl="/sign-in">
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-100">
                <LogOut size={18} />

                Logout
              </button>
            </SignOutButton>
          </div>
        </div>
      </aside>
    </>
  );
}