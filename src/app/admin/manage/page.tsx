"use client";

import AppLayout from "@/components/layout/app-layout";

import {
  useEffect,
  useState,
} from "react";

type Lesson = {
  id: string;

  title: string;

  description: string;

  slug: string;
};

export default function ManagePage() {
  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  /*
    LOAD LESSONS
  */
  useEffect(() => {
    fetchLessons();
  }, []);

  async function fetchLessons() {
    try {
      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/paths`
        );

      const paths =
        await response.json();

      const allLessons =
        paths.flatMap(
          (path: any) =>
            path.lessons
        );

      setLessons(allLessons);
    } catch (error) {
      console.error(error);
    }
  }

  /*
    DELETE LESSON
  */
  async function deleteLesson(
    id: string
  ) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lesson/${id}`,
        {
          method: "DELETE",
        }
      );

      setLessons((prev) =>
        prev.filter(
          (lesson) =>
            lesson.id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppLayout>
      <div>
        {/* HEADER */}
        <div>
          <h1 className="text-5xl font-extrabold text-[#0B1736]">
            Manage Lessons
          </h1>

          <p className="mt-3 text-xl text-gray-500">
            Edit and delete lessons.
          </p>
        </div>

        {/* LESSONS */}
        <div className="mt-10 space-y-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded-[32px] bg-white p-8 shadow-xl"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* INFO */}
                <div>
                  <h2 className="text-3xl font-extrabold text-[#0B1736]">
                    {lesson.title}
                  </h2>

                  <p className="mt-3 text-gray-500">
                    {
                      lesson.description
                    }
                  </p>

                  <p className="mt-3 font-bold text-green-600">
                    /lesson/
                    {lesson.slug}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">
                  <button className="rounded-2xl bg-blue-500 px-6 py-3 font-bold text-white">
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteLesson(
                        lesson.id
                      )
                    }
                    className="rounded-2xl bg-red-500 px-6 py-3 font-bold text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}