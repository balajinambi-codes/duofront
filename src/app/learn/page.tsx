import AppLayout from "@/components/layout/app-layout";

import Link from "next/link";

import {
  Lock,
  PlayCircle,
  CheckCircle2,
  Rocket,
} from "lucide-react";

import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import { apiFetch } from "@/lib/api";

import { syncUser } from "@/lib/sync-user";

import { getProgress } from "@/lib/get-progress";

export default async function LearnPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // USER
  const user = await syncUser();

  if (!user) {
    redirect("/sign-in");
  }

  // CLERK USER
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

  // USER PROGRESS
  const progress =
    await getProgress(user.id);

  const completedLessons =
    progress
      .filter(
        (item: any) =>
          item.completed
      )
      .map(
        (item: any) =>
          item.lessonId
      );

  // FETCH PATHS
  const paths = await apiFetch(
    "/api/paths"
  );

  // FOUNDATION PATH
  const foundationPath = paths.find(
    (path: any) =>
      path.stackKey ===
      "frontend-foundations"
  );

  if (!foundationPath) {
    return (
      <AppLayout>
        <div className="rounded-3xl bg-white p-10 shadow-xl">
          <h1 className="text-4xl font-bold">
            No learning paths found
          </h1>
        </div>
      </AppLayout>
    );
  }

  const foundationLessons =
    foundationPath.lessons;

  // COMPLETED COUNT
  const completedCount =
    foundationLessons.filter(
      (lesson: any) =>
        completedLessons.includes(
          lesson.id
        )
    ).length;

  // FOUNDATION COMPLETED
  const foundationCompleted =
    completedCount ===
    foundationLessons.length;

  return (
    <AppLayout>
      {/* HEADER */}
      <div>
        <div className="inline-flex items-center gap-3 rounded-full bg-green-100 px-5 py-2 font-bold text-green-600">
          <Rocket size={18} />

          Month 1 — Frontend Foundations
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0B1736] md:text-6xl">
          HTML, CSS & JavaScript
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-gray-500 md:text-xl md:leading-9">
          Complete the frontend
          foundations roadmap to
          unlock full stack
          specialization paths.
        </p>
      </div>

      {/* ROADMAP */}
      <div className="mt-16 rounded-[40px] bg-white p-6 shadow-xl md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0B1736] md:text-4xl">
              Frontend Foundations
            </h2>

            <p className="mt-3 text-base text-gray-500 md:text-lg">
              Complete all lessons to
              unlock stack selection.
            </p>
          </div>

          {/* PROGRESS */}
          <div className="rounded-3xl bg-green-100 px-6 py-4 text-center">
            <p className="text-3xl font-extrabold text-green-600">
              {completedCount}/
              {
                foundationLessons.length
              }
            </p>

            <p className="mt-1 text-sm font-semibold text-green-500">
              Completed
            </p>
          </div>
        </div>

        {/* LESSONS */}
        <div className="mt-14 space-y-8">
          {foundationLessons.map(
            (
              lesson: any,
              index: number
            ) => {
              const completed =
                completedLessons.includes(
                  lesson.id
                );

              const unlocked =
                index === 0 ||
                completedLessons.includes(
                  foundationLessons[
                    index - 1
                  ]?.id
                );

              return (
                <div
                  key={lesson.id}
                  className={`flex flex-col gap-6 rounded-[32px] border p-7 transition-all md:flex-row md:items-center md:justify-between ${
                    completed
                      ? "border-green-200 bg-green-50"
                      : unlocked
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-100 bg-gray-50 opacity-70"
                  }`}
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-6">
                    {/* ICON */}
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl ${
                        completed
                          ? "bg-green-500"
                          : unlocked
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2
                          size={36}
                        />
                      ) : unlocked ? (
                        <PlayCircle
                          size={36}
                        />
                      ) : (
                        <Lock size={34} />
                      )}
                    </div>

                    {/* INFO */}
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#0B1736] md:text-3xl">
                        {lesson.title}
                      </h3>

                      <p className="mt-3 text-base text-gray-500 md:text-lg">
                        {
                          lesson.description
                        }
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    {/* XP */}
                    <div className="rounded-2xl bg-white px-6 py-4 text-center font-bold text-green-600 shadow-sm">
                      +{lesson.xp} XP
                    </div>

                    {/* BUTTON */}
                    {completed ? (
                      <Link
                        href={`/lesson/${lesson.slug}`}
                        className="rounded-2xl bg-green-500 px-7 py-4 text-center font-bold text-white shadow-lg"
                      >
                        Review
                      </Link>
                    ) : unlocked ? (
                      <Link
                        href={`/lesson/${lesson.slug}`}
                        className="rounded-2xl bg-blue-500 px-7 py-4 text-center font-bold text-white shadow-lg transition hover:scale-105"
                      >
                        Start
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="cursor-not-allowed rounded-2xl bg-gray-300 px-7 py-4 font-bold text-white"
                      >
                        Locked
                      </button>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* STACK SELECTION */}
      <div className="mt-16 rounded-[40px] border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center md:p-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-gray-500">
          {foundationCompleted ? (
            <Rocket size={40} />
          ) : (
            <Lock size={40} />
          )}
        </div>

        <h2 className="mt-8 text-3xl font-extrabold text-gray-700 md:text-5xl">
          {foundationCompleted
            ? "Stacks Unlocked"
            : "Stack Selection Locked"}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-500 md:text-xl md:leading-9">
          {foundationCompleted
            ? "Choose your full stack specialization path."
            : "Complete all HTML, CSS and JavaScript lessons to unlock specialization stacks."}
        </p>

        {/* STACKS */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            "MERN Full Stack",
            "Next.js Full Stack",
            "Java Full Stack",
            "Python Full Stack",
          ].map((stack) => (
            <div
              key={stack}
              className={`rounded-3xl p-8 shadow-sm transition ${
                foundationCompleted
                  ? "bg-white hover:scale-105"
                  : "bg-white opacity-60"
              }`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200">
                {foundationCompleted ? (
                  <Rocket className="text-green-500" />
                ) : (
                  <Lock className="text-gray-500" />
                )}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#0B1736]">
                {stack}
              </h3>

              <p className="mt-3 text-gray-500">
                {foundationCompleted
                  ? "Available now"
                  : "Unlock after foundation completion"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}