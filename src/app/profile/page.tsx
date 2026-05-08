import Sidebar from "@/components/layout/sidebar";

import {
  Trophy,
  Flame,
  BookOpen,
} from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { apiFetch } from "@/lib/api";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // FETCH USERS FROM BACKEND
  const users = await apiFetch("/api/users");

  // FIND CURRENT USER
  const user = users.find(
    (u: any) => u.clerkId === userId
  );

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-[#F3F7F5]">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* PROFILE CARD */}
        <div className="rounded-[32px] bg-white p-10 shadow-xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            {/* IMAGE */}
            <img
              src={
                user.imageUrl ||
                "https://placehold.co/200x200"
              }
              alt="profile"
              className="h-32 w-32 rounded-full border-4 border-green-100 object-cover shadow-lg"
            />

            {/* USER INFO */}
            <div>
              <div className="inline-flex rounded-2xl bg-green-100 px-4 py-2 text-sm font-bold text-green-600">
                LEVEL {user.level}
              </div>

              <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
                {user.name || "DuoCode User"}
              </h1>

              <p className="mt-3 text-lg text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* XP */}
            <div className="rounded-3xl bg-gradient-to-br from-green-50 to-green-100 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <Trophy className="text-green-500" />
                </div>

                <h2 className="text-xl font-bold">
                  Total XP
                </h2>
              </div>

              <p className="mt-6 text-5xl font-extrabold text-green-600">
                {user.xp}
              </p>
            </div>

            {/* STREAK */}
            <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <Flame className="text-orange-500" />
                </div>

                <h2 className="text-xl font-bold">
                  Streak
                </h2>
              </div>

              <p className="mt-6 text-5xl font-extrabold text-orange-500">
                {user.streak}
              </p>
            </div>

            {/* LEVEL */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <BookOpen className="text-blue-500" />
                </div>

                <h2 className="text-xl font-bold">
                  Level
                </h2>
              </div>

              <p className="mt-6 text-5xl font-extrabold text-blue-500">
                {user.level}
              </p>
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="mt-14 rounded-3xl border border-gray-100 bg-gray-50 p-8">
            <h2 className="text-3xl font-extrabold">
              Learning Activity
            </h2>

            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
                <div>
                  <p className="text-lg font-bold">
                    HTML Basics
                  </p>

                  <p className="mt-1 text-gray-500">
                    Completed lesson
                  </p>
                </div>

                <div className="rounded-2xl bg-green-100 px-4 py-2 font-bold text-green-600">
                  +10 XP
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
                <div>
                  <p className="text-lg font-bold">
                    CSS Fundamentals
                  </p>

                  <p className="mt-1 text-gray-500">
                    In progress
                  </p>
                </div>

                <div className="rounded-2xl bg-yellow-100 px-4 py-2 font-bold text-yellow-600">
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}