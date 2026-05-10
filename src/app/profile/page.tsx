import AppLayout from "@/components/layout/app-layout";

import {
  Trophy,
  Flame,
  BookOpen,
} from "lucide-react";

import { redirect } from "next/navigation";

import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

import { syncUser } from "@/lib/sync-user";

export default async function ProfilePage() {
  const { userId } = await auth();

  // NOT LOGGED IN
  if (!userId) {
    redirect("/sign-in");
  }

  // GET CLERK USER
  const clerkUser = await currentUser();

  const email =
    clerkUser?.primaryEmailAddress?.emailAddress;

  // COLLEGE EMAIL ONLY
  if (
    !email?.endsWith(
      "@francisxavier.ac.in"
    )
  ) {
    redirect("/blocked");
  }

  // GET DATABASE USER
  const user = await syncUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <AppLayout>
      <div className="w-full overflow-hidden">
        {/* PROFILE CARD */}
        <div className="rounded-[32px] bg-white p-6 shadow-xl md:p-10">
          {/* HEADER */}
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <img
              src={clerkUser?.imageUrl}
              alt="profile"
              className="h-28 w-28 rounded-full border-4 border-green-100 object-cover md:h-32 md:w-32"
            />

            <div className="min-w-0">
              <h1 className="break-words text-3xl font-extrabold text-[#0B1736] md:text-5xl">
                {user.name}
              </h1>

              <p className="mt-3 break-words text-base text-gray-500 md:text-lg">
                {email}
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* XP */}
            <div className="rounded-3xl bg-green-50 p-6">
              <div className="flex items-center gap-3">
                <Trophy className="text-green-500" />

                <h2 className="text-xl font-bold text-[#0B1736]">
                  Total XP
                </h2>
              </div>

              <p className="mt-4 text-3xl font-extrabold text-[#0B1736] md:text-5xl">
                {user.xp}
              </p>
            </div>

            {/* STREAK */}
            <div className="rounded-3xl bg-orange-50 p-6">
              <div className="flex items-center gap-3">
                <Flame className="text-orange-500" />

                <h2 className="text-xl font-bold text-[#0B1736]">
                  Streak
                </h2>
              </div>

              <p className="mt-4 text-3xl font-extrabold text-[#0B1736] md:text-5xl">
                {user.streak}
              </p>
            </div>

            {/* LEVEL */}
            <div className="rounded-3xl bg-blue-50 p-6">
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-500" />

                <h2 className="text-xl font-bold text-[#0B1736]">
                  Level
                </h2>
              </div>

              <p className="mt-4 text-3xl font-extrabold text-[#0B1736] md:text-5xl">
                {user.level}
              </p>
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="mt-12 rounded-[32px] bg-[#F8FAF9] p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-[#0B1736] md:text-4xl">
              Recent Activity
            </h2>

            <div className="mt-8 space-y-4">
              <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-bold text-[#0B1736]">
                    Completed HTML
                    Basics
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Earned 10 XP
                  </p>
                </div>

                <div className="rounded-full bg-green-100 px-5 py-2 font-bold text-green-600">
                  +10 XP
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-bold text-[#0B1736]">
                    Frontend Foundations
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Current Learning Path
                  </p>
                </div>

                <div className="rounded-full bg-yellow-100 px-5 py-2 font-bold text-yellow-600">
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}