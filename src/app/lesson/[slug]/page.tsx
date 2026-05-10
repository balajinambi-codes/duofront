import AppLayout from "@/components/layout/app-layout";

import { apiFetch } from "@/lib/api";

import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import ReactMarkdown from "react-markdown";

import CompleteButton from "@/components/lesson/complete-button";

import CodePlayground from "@/components/lesson/code-playground";

import XpPopup from "./xp-popup";

import { getProgress } from "@/lib/get-progress";

import QuizCard from "@/components/lesson/quiz-card";

import { syncUser } from "@/lib/sync-user";

import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  // AUTH
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // DATABASE USER
  const user = await syncUser();

  if (!user) {
    redirect("/sign-in");
  }

  // USER PROGRESS
  const progress =
    (await getProgress(user.id)) ||
    [];

  // COMPLETED LESSON IDS
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

  // FETCH PATHS
  const paths =
    (await apiFetch(
      "/api/paths"
    )) || [];

  let currentLesson: any = null;

  let currentPath: any = null;

  // FIND LESSON
  for (const path of paths) {
    const lesson =
      path.lessons?.find(
        (lesson: any) =>
          lesson.slug === slug
      );

    if (lesson) {
      currentLesson = lesson;

      currentPath = path;

      break;
    }
  }

  // LESSON NOT FOUND
  if (
    !currentLesson ||
    !currentPath
  ) {
    redirect("/learn");
  }

  // LESSON INDEX
  const lessonIndex =
    currentPath.lessons.findIndex(
      (lesson: any) =>
        lesson.id ===
        currentLesson.id
    );

  // UNLOCK CHECK
  const unlocked =
    lessonIndex === 0 ||
    completedLessons.includes(
      currentPath.lessons[
        lessonIndex - 1
      ]?.id
    );

  // BLOCK LOCKED LESSON
  if (!unlocked) {
    redirect("/learn");
  }

  // CURRENT LESSON COMPLETED
  const isCompleted =
    completedLessons.includes(
      currentLesson.id
    );

  // PREVIOUS LESSON
  const previousLesson =
    lessonIndex > 0
      ? currentPath.lessons[
          lessonIndex - 1
        ]
      : null;

  // NEXT LESSON
  const nextLesson =
    lessonIndex <
    currentPath.lessons.length - 1
      ? currentPath.lessons[
          lessonIndex + 1
        ]
      : null;

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* SIDEBAR */}
        <div className="h-fit w-full rounded-[32px] bg-white p-6 shadow-xl lg:sticky lg:top-8 lg:w-80">
          <h2 className="break-words text-2xl font-extrabold text-[#0B1736] md:text-3xl">
            {currentPath.title}
          </h2>

          <div className="mt-8 space-y-3">
            {currentPath.lessons.map(
              (
                lesson: any,
                index: number
              ) => {
                const active =
                  lesson.slug ===
                  currentLesson.slug;

                const completed =
                  completedLessons.includes(
                    lesson.id
                  );

                const lessonUnlocked =
                  index === 0 ||
                  completedLessons.includes(
                    currentPath.lessons[
                      index - 1
                    ]?.id
                  );

                return (
                  <Link
                    key={lesson.id}
                    href={
                      lessonUnlocked
                        ? `/lesson/${lesson.slug}`
                        : "#"
                    }
                    className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition ${
                      active
                        ? "bg-green-500 text-white"
                        : "hover:bg-gray-100"
                    } ${
                      !lessonUnlocked
                        ? "cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >
                    <div>
                      {completed ? (
                        <CheckCircle2 />
                      ) : lessonUnlocked ? (
                        <ChevronRight />
                      ) : (
                        <Lock />
                      )}
                    </div>

                    <p className="font-semibold">
                      {lesson.title}
                    </p>
                  </Link>
                );
              }
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1 overflow-hidden rounded-[32px] bg-white p-6 shadow-xl md:p-10">
          {/* TITLE */}
          <h1 className="break-words text-3xl font-extrabold text-[#0B1736] md:text-5xl">
            {currentLesson.title}
          </h1>

          <p className="mt-4 text-base leading-8 text-gray-500 md:text-xl">
            {
              currentLesson.description
            }
          </p>

          {/* MARKDOWN */}
          <div className="prose prose-lg mt-10 max-w-none overflow-hidden prose-headings:text-black prose-p:text-gray-700">
            <ReactMarkdown>
              {currentLesson.content}
            </ReactMarkdown>
          </div>

          {/* EXAMPLE CODE */}
          {currentLesson.exampleCode && (
            <div className="mt-10 overflow-hidden rounded-[32px] bg-[#1E1E1E] shadow-xl">
              <div className="border-b border-white/10 px-6 py-4 text-sm font-bold text-green-400">
                Example Code
              </div>

              <pre className="overflow-x-auto p-6 text-sm text-white">
                <code>
                  {
                    currentLesson.exampleCode
                  }
                </code>
              </pre>
            </div>
          )}

          {/* PLAYGROUND */}
          <CodePlayground
            userId={user.id}
            lessonId={currentLesson.id}
            lessonSlug={
              currentLesson.slug
            }
            challengeTitle="Create a Green Heading"

            challengeDescription="Create an h1 tag and make it green using CSS."

            validationChecks={[
              "<h1",
              "green",
            ]}
            defaultHtml={`<h1>Hello DuoCode 🚀</h1>

<p>Edit this code and click Run.</p>`}
            defaultCss={`body {
  font-family: sans-serif;
  padding: 20px;
}

h1 {
  color: green;
}`}
            defaultJs={`console.log("DuoCode Running 🚀");`}
          />
          {/* QUIZ */}
          <QuizCard
            question="Which HTML tag creates the largest heading?"

            options={[
              "<p>",
              "<div>",
              "<h1>",
              "<span>",
            ]}

            correctAnswer="<h1>"

            explanation="The h1 tag creates the largest heading in HTML."
          />
          {/* ACTIONS */}
          <div className="mt-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* PREVIOUS */}
            {previousLesson ? (
              <Link
                href={`/lesson/${previousLesson.slug}`}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gray-100 px-6 py-4 font-bold transition hover:bg-gray-200"
              >
                <ChevronLeft />

                Previous
              </Link>
            ) : (
              <div />
            )}

            {/* COMPLETE */}
            <CompleteButton
              userId={user.id}
              lessonId={
                currentLesson.id
              }
              alreadyCompleted={
                isCompleted
              }
            />

            {/* NEXT */}
            {nextLesson ? (
              <Link
                href={`/lesson/${nextLesson.slug}`}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gray-100 px-6 py-4 font-bold transition hover:bg-gray-200"
              >
                Next

                <ChevronRight />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}