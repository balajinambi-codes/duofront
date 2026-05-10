import AppLayout from "@/components/layout/app-layout";

import StatsCard from "@/components/dashboard/stats-card";

import {
  Trophy,
  Flame,
  BookOpen,
  Rocket,
} from "lucide-react";

import Link from "next/link";

import { redirect } from "next/navigation";

import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

import { syncUser } from "@/lib/sync-user";

import { getDashboardData } from "@/lib/get-dashboard-data";

import AchievementCard from "@/components/dashboard/achievement-card";

import { achievements } from "@/lib/achievements";

import XpProgress from "@/components/dashboard/xp-progress";

export default async function DashboardPage() {
  const { userId } = await auth();

  // NOT LOGGED IN
  if (!userId) {
    redirect("/sign-in");
  }

  // GET CLERK USER
  const clerkUser =
    await currentUser();

  const email =
    clerkUser?.primaryEmailAddress
      ?.emailAddress;

  // EMAIL RESTRICTION
  if (
    !email?.endsWith(
      "@francisxavier.ac.in"
    )
  ) {
    redirect("/blocked");
  }

  // DATABASE USER
  const user = await syncUser();

  if (!user) {
    redirect("/sign-in");
  }

  // DASHBOARD DATA
  const dashboard =
    await getDashboardData(
      user.id
    );

  return (
    <AppLayout>
      <div className="w-full overflow-hidden">
        {/* HEADER */}
        <div>
          <h1 className="break-words text-3xl font-extrabold tracking-tight text-[#0B1736] md:text-5xl">
            Hey, {user.name} 👋
          </h1>

          <p className="mt-3 text-base text-gray-500 md:text-lg">
            Ready to level up today?
          </p>
        </div>

        {/* STATS */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <StatsCard
            title="Total XP"
            value={`${user.xp}`}
            icon={<Trophy />}
          />

          <StatsCard
            title="Completed"
            value={`${dashboard.completedCount}/${dashboard.totalLessons}`}
            icon={<BookOpen />}
          />

          <StatsCard
            title="Progress"
            value={`${dashboard.percentage}%`}
            icon={<Rocket />}
          />
        </div>

        {/* XP PROGRESS */}
        <div className="mt-10">
          <XpProgress
            xp={user.xp}
            level={user.level}
          />
        </div>
        {/* ACHIEVEMENTS */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-extrabold text-[#0B1736]">
              Achievements
            </h2>

            <p className="font-bold text-green-600">
              {achievements.length} Badges
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {achievements.map(
              (achievement) => (
                <AchievementCard
                  key={achievement.id}
                  icon={achievement.icon}
                  title={
                    achievement.title
                  }
                  description={
                    achievement.description
                  }
                />
              )
            )}
          </div>
        </div>
        {/* CONTINUE LEARNING */}
        <div className="mt-10 w-full overflow-hidden rounded-[32px] bg-gradient-to-r from-green-500 to-emerald-400 p-6 text-white shadow-xl md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-100">
            Continue Learning
          </p>

          <h2 className="mt-4 break-words text-3xl font-extrabold md:text-5xl">
            {dashboard.nextLesson
              ?.title ||
              "Frontend Foundations Complete 🎉"}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-green-50 md:text-lg">
            {dashboard.nextLesson
              ?.description ||
              "You completed the frontend foundation roadmap."}
          </p>

          {/* PROGRESS BAR */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>
                Course Progress
              </span>

              <span>
                {
                  dashboard.percentage
                }
                %
              </span>
            </div>

            <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{
                  width: `${dashboard.percentage}%`,
                }}
              />
            </div>
          </div>

          {/* BUTTON */}
          {dashboard.nextLesson && (
            <Link
              href={`/lesson/${dashboard.nextLesson.slug}`}
              className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-bold text-green-600 transition hover:scale-105"
            >
              Continue Path
            </Link>
          )}
        </div>
      </div>
    </AppLayout>
  );
}