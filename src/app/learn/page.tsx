import Sidebar from "@/components/layout/sidebar";

import {
  Lock,
  PlayCircle,
  CheckCircle2,
  Rocket,
} from "lucide-react";

import {
  auth,
} from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function LearnPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  /*
    FOUNDATION LESSONS
  */
  const foundationLessons = [
    {
      title: "Introduction to HTML",
      description:
        "Learn the structure of web pages.",

      xp: 50,
      completed: true,
    },

    {
      title: "HTML Elements & Tags",
      description:
        "Master headings, paragraphs and links.",

      xp: 60,
      completed: false,
    },

    {
      title: "CSS Fundamentals",
      description:
        "Style beautiful web pages.",

      xp: 80,
      completed: false,
    },

    {
      title: "Flexbox & Grid",
      description:
        "Build responsive layouts.",

      xp: 100,
      completed: false,
    },

    {
      title: "JavaScript Basics",
      description:
        "Learn variables, functions and logic.",

      xp: 120,
      completed: false,
    },

    {
      title: "DOM Manipulation",
      description:
        "Make websites interactive.",

      xp: 140,
      completed: false,
    },

    {
      title: "APIs & Async JavaScript",
      description:
        "Connect frontend with APIs.",

      xp: 160,
      completed: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F3F7F5]">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div>
          <div className="inline-flex items-center gap-3 rounded-full bg-green-100 px-5 py-2 font-bold text-green-600">
            <Rocket size={18} />
            Month 1 — Frontend Foundations
          </div>

          <h1 className="mt-6 text-6xl font-extrabold tracking-tight">
            HTML, CSS & JavaScript
          </h1>

          <p className="mt-4 max-w-3xl text-xl leading-9 text-gray-500">
            Complete the frontend foundations
            roadmap to unlock full stack
            specialization paths.
          </p>
        </div>

        {/* FOUNDATION ROADMAP */}
        <div className="mt-16 rounded-[40px] bg-white p-10 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-extrabold">
                Frontend Foundations
              </h2>

              <p className="mt-3 text-lg text-gray-500">
                Complete all lessons to unlock
                stack selection.
              </p>
            </div>

            <div className="rounded-3xl bg-green-100 px-6 py-4 text-center">
              <p className="text-3xl font-extrabold text-green-600">
                1/7
              </p>

              <p className="mt-1 text-sm font-semibold text-green-500">
                Completed
              </p>
            </div>
          </div>

          {/* LESSONS */}
          <div className="mt-14 space-y-8">
            {foundationLessons.map(
              (lesson, index) => {
                const unlocked =
                  index === 0 ||
                  foundationLessons[
                    index - 1
                  ]?.completed;

                return (
                  <div
                    key={lesson.title}
                    className={`flex items-center justify-between rounded-[32px] border p-7 transition-all ${
                      lesson.completed
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
                          lesson.completed
                            ? "bg-green-500"
                            : unlocked
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle2 size={36} />
                        ) : unlocked ? (
                          <PlayCircle size={36} />
                        ) : (
                          <Lock size={34} />
                        )}
                      </div>

                      {/* INFO */}
                      <div>
                        <h3 className="text-3xl font-extrabold">
                          {lesson.title}
                        </h3>

                        <p className="mt-3 text-lg text-gray-500">
                          {
                            lesson.description
                          }
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-5">
                      {/* XP */}
                      <div className="rounded-2xl bg-white px-6 py-4 font-bold text-green-600 shadow-sm">
                        +{lesson.xp} XP
                      </div>

                      {/* BUTTON */}
                      {lesson.completed ? (
                        <button className="rounded-2xl bg-green-500 px-7 py-4 font-bold text-white shadow-lg">
                          Completed
                        </button>
                      ) : unlocked ? (
                        <button className="rounded-2xl bg-blue-500 px-7 py-4 font-bold text-white shadow-lg transition hover:scale-105">
                          Start
                        </button>
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
        <div className="mt-16 rounded-[40px] border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-gray-500">
            <Lock size={40} />
          </div>

          <h2 className="mt-8 text-5xl font-extrabold text-gray-700">
            Stack Selection Locked
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-gray-500">
            Complete all HTML, CSS and JavaScript
            lessons to unlock specialization
            stacks like MERN, Next.js, Java and Python.
          </p>

          {/* STACKS */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              "MERN Stack",
              "Next.js Stack",
              "Java Stack",
              "Python Stack",
            ].map((stack) => (
              <div
                key={stack}
                className="rounded-3xl bg-white p-8 opacity-60 shadow-sm"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200">
                  <Lock className="text-gray-500" />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {stack}
                </h3>

                <p className="mt-3 text-gray-500">
                  Unlock after foundation
                  completion
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}