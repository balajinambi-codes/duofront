"use client";

import AppLayout from "@/components/layout/app-layout";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditLessonPage() {
  const params = useParams();

  const router = useRouter();

  const lessonId =
    params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [content, setContent] =
    useState("");

  const [xp, setXp] =
    useState(50);

  /*
    LOAD LESSON
  */
  useEffect(() => {
    fetchLesson();
  }, []);

  async function fetchLesson() {
    try {
      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lesson/${lessonId}`
        );

      const lesson =
        await response.json();

      setTitle(
        lesson.title
      );

      setDescription(
        lesson.description
      );

      setContent(
        lesson.content
      );

      setXp(lesson.xp);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  /*
    UPDATE LESSON
  */
  async function updateLesson() {
    try {
      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lesson/${lessonId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              title,

              description,

              content,

              xp,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Update failed"
        );
      }

      alert(
        "Lesson updated 🚀"
      );

      router.push(
        "/admin/manage"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <p className="text-2xl font-bold">
          Loading...
        </p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl rounded-[32px] bg-white p-10 shadow-xl">
        {/* HEADER */}
        <h1 className="text-5xl font-extrabold text-[#0B1736]">
          Edit Lesson
        </h1>

        <p className="mt-3 text-xl text-gray-500">
          Update lesson content.
        </p>

        {/* FORM */}
        <div className="mt-10 space-y-6">
          {/* TITLE */}
          <div>
            <label className="text-lg font-bold">
              Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="mt-3 w-full rounded-2xl border border-gray-300 p-5 outline-none focus:border-green-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-lg font-bold">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="mt-3 h-32 w-full rounded-2xl border border-gray-300 p-5 outline-none focus:border-green-500"
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="text-lg font-bold">
              Markdown Content
            </label>

            <textarea
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
              className="mt-3 h-[400px] w-full rounded-2xl border border-gray-300 p-5 outline-none focus:border-green-500"
            />
          </div>

          {/* XP */}
          <div>
            <label className="text-lg font-bold">
              XP Reward
            </label>

            <input
              type="number"
              value={xp}
              onChange={(e) =>
                setXp(
                  Number(
                    e.target.value
                  )
                )
              }
              className="mt-3 w-full rounded-2xl border border-gray-300 p-5 outline-none focus:border-green-500"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={updateLesson}
            className="rounded-2xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </div>
    </AppLayout>
  );
}