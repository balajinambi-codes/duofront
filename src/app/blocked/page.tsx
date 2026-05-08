"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useClerk,
} from "@clerk/nextjs";

import Link from "next/link";

export default function BlockedPage() {
  const { signOut } = useClerk();

  const [countdown, setCountdown] =
    useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(async () => {
      await signOut();

      window.location.href = "/sign-in";
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [signOut]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5FAF7] p-8 text-center">
      <div className="rounded-[40px] bg-white p-14 shadow-2xl">
        <h1 className="text-6xl font-extrabold text-red-500">
          Access Denied
        </h1>

        <p className="mt-6 max-w-xl text-xl leading-9 text-gray-600">
          Only allowed email accounts can
          access DuoCode.
        </p>

        <div className="mt-8 rounded-2xl bg-red-50 px-6 py-5">
          <p className="text-lg font-semibold text-red-500">
            Session will reset in{" "}
            {countdown}s
          </p>
        </div>

        <Link
          href="/sign-in"
          className="mt-10 inline-flex rounded-2xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105"
        >
          Go To Sign In
        </Link>
      </div>
    </div>
  );
}