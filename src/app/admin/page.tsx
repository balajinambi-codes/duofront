import AppLayout from "@/components/layout/app-layout";

import Link from "next/link";

import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user =
    await currentUser();

  const email =
    user?.primaryEmailAddress
      ?.emailAddress;

  // YOUR EMAIL ONLY
  if (
    email !==
    "balajim.ug.25.cs@francisxavier.ac.in"
  ) {
    redirect("/dashboard");
  }
  return (
    <AppLayout>
      <div className="space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-5xl font-extrabold text-[#0B1736]">
            Admin Panel
          </h1>

          <p className="mt-3 text-xl text-gray-500">
            Manage lessons and learning paths.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* CREATE LESSON */}
          <Link
            href="/admin/create-lesson"
            className="rounded-[32px] bg-white p-8 shadow-xl transition hover:-translate-y-1"
          >
            <div className="text-5xl">
              📘
            </div>

            <h2 className="mt-6 text-3xl font-extrabold text-[#0B1736]">
              Create Lesson
            </h2>

            <p className="mt-3 text-gray-500">
              Add new coding lessons.
            </p>
          </Link>

          {/* CREATE PATH */}
          <Link
            href="/admin/create-path"
            className="rounded-[32px] bg-white p-8 shadow-xl transition hover:-translate-y-1"
          >
            <div className="text-5xl">
              🛤️
            </div>

            <h2 className="mt-6 text-3xl font-extrabold text-[#0B1736]">
              Create Path
            </h2>

            <p className="mt-3 text-gray-500">
              Add learning paths.
            </p>
          </Link>

          {/* MANAGE */}
          <Link
            href="/admin/manage"
            className="rounded-[32px] bg-white p-8 shadow-xl transition hover:-translate-y-1"
          >
            <div className="text-5xl">
              ⚙️
            </div>

            <h2 className="mt-6 text-3xl font-extrabold text-[#0B1736]">
              Manage Content
            </h2>

            <p className="mt-3 text-gray-500">
              Edit existing lessons.
            </p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}