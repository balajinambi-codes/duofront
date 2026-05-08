import Sidebar from "@/components/layout/sidebar";
import StatsCard from "@/components/dashboard/stats-card";

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

export default async function DashboardPage() {
  const { userId } = await auth();

  // NOT LOGGED IN
  if (!userId) {
    redirect("/sign-in");
  }

  // GET CLERK USER
  const clerkUser = await currentUser();

  const email =
    clerkUser?.primaryEmailAddress?.emailAddress;

  // HOTMAIL ONLY
  if (
    !email?.endsWith("@francisxavier.ac.in")
  ) {
    redirect("/blocked");
  }

  // SYNC DATABASE USER
  const user = await syncUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-[#F3F7F5]">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight">
            Hey, {user.name} 👋
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Ready to level up today?
          </p>
        </div>

        {/* STATS */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <StatsCard
            title="Total XP"
            value={`${user.xp}`}
            icon={<Trophy />}
          />

          <StatsCard
            title="Daily Streak"
            value={`${user.streak} Days`}
            icon={<Flame />}
          />

          <StatsCard
            title="Level"
            value={`${user.level}`}
            icon={<BookOpen />}
          />
        </div>

        {/* CONTINUE LEARNING */}
        <div className="mt-10 rounded-[32px] bg-gradient-to-r from-green-500 to-emerald-400 p-10 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-100">
            Continue Learning
          </p>

          <h2 className="mt-4 text-4xl font-extrabold">
            HTML Basics
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-green-50">
            Continue mastering frontend development
            through interactive coding lessons.
          </p>

          <button className="mt-8 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-green-600 transition hover:scale-105">
            Continue Path
          </button>
        </div>
      </main>
    </div>
  );
}