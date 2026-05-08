import Sidebar from "@/components/layout/sidebar";

import {
  auth,
} from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import { apiFetch } from "@/lib/api";

import {
  Trophy,
  BookOpen,
} from "lucide-react";

export default async function LessonPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // FETCH PATHS
  const paths = await apiFetch("/api/paths");

  // FIND LESSON
  let lesson: any = null;

  for (const path of paths) {
    const found = path.lessons.find(
      (lesson: any) =>
        lesson.id === params.id
    );

    if (found) {
      lesson = found;
      break;
    }
  }

  // NOT FOUND
  if (!lesson) {
    redirect("/learn");
  }

  return (
    <div className="flex min-h-screen bg-[#F3F7F5]">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* TOP */}
        <div className="rounded-[36px] bg-gradient-to-r from-green-500 to-emerald-400 p-10 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20">
              <BookOpen size={38} />
            </div>

            <div>
              <p className="text-green-100">
                Interactive Lesson
              </p>

              <h1 className="mt-2 text-5xl font-extrabold">
                {lesson.title}
              </h1>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-xl text-green-50">
            {lesson.description}
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3 font-bold text-green-600">
            <Trophy />
            +{lesson.xp} XP Reward
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-10 rounded-[36px] bg-white p-10 shadow-xl">
          <h2 className="text-4xl font-extrabold">
            Lesson Content
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-9 text-gray-600">
            <p>
              This is where your interactive
              lesson content will appear.
            </p>

            <p>
              You can add:
            </p>

            <ul className="list-disc space-y-4 pl-6">
              <li>Code examples</li>

              <li>Interactive quizzes</li>

              <li>Coding challenges</li>

              <li>Videos</li>

              <li>Practice tasks</li>

              <li>Real projects</li>
            </ul>

            <p>
              This lesson system is fully
              dynamic and database-driven.
            </p>
          </div>

          {/* COMPLETE BUTTON */}
          <button className="mt-10 rounded-3xl bg-green-500 px-8 py-5 text-lg font-bold text-white shadow-xl transition hover:scale-105">
            Complete Lesson
          </button>
        </div>
      </main>
    </div>
  );
}