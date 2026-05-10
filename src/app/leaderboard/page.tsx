import Sidebar from "@/components/layout/sidebar";

import {
  Trophy,
  Flame,
  Zap,
} from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { apiFetch } from "@/lib/api";

export default async function LeaderboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // FETCH USERS
  const users =
    (await apiFetch(
      "/api/leaderboard"
    )) || [];

  // SORT BY XP
  const sortedUsers = [...users].sort(
    (a: any, b: any) => b.xp - a.xp
  );

  return (
    <div className="flex min-h-screen bg-[#F3F7F5]">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
            <Trophy className="h-10 w-10 text-yellow-500" />
          </div>

          <h1 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight">
            Leaderboard
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Top learners this season
          </p>
        </div>

        {/* LEADERBOARD CARD */}
        <div className="mx-auto mt-12 max-w-3xl rounded-[36px] bg-white p-6 shadow-xl">
          <div className="space-y-4">
            {sortedUsers.map(
              (user: any, index: number) => {
                const isCurrentUser =
                  user.clerkId === userId;

                return (
                  <div
                    key={user.id}
                    className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-3xl border p-5 transition-all ${
                      isCurrentUser
                        ? "border-green-300 bg-green-50 shadow-md"
                        : "border-transparent bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-5">
                      {/* RANK */}
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-600"
                            : index === 1
                            ? "bg-gray-200 text-gray-700"
                            : index === 2
                            ? "bg-orange-100 text-orange-600"
                            : "bg-white text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* AVATAR */}
                      <img
                        src={
                          user.imageUrl ||
                          "https://placehold.co/100x100"
                        }
                        alt="avatar"
                        className="h-14 w-14 rounded-full object-cover"
                      />

                      {/* USER INFO */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold">
                            {user.name}
                          </h2>

                          {isCurrentUser && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                              YOU
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-gray-500">
                          Level {user.level}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-6">
                      {/* STREAK */}
                      <div className="flex items-center gap-2 text-orange-500">
                        <Flame className="h-5 w-5" />

                        <span className="font-bold">
                          {user.streak}
                        </span>
                      </div>

                      {/* XP */}
                      <div className="flex items-center gap-2 text-yellow-500">
                        <Zap className="h-5 w-5" />

                        <span className="font-bold">
                          {user.xp}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </main>
    </div>
  );
}