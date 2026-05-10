"use client";

import AppLayout from "@/components/layout/app-layout";

import { useState } from "react";

export default function CreateLessonPage() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [content, setContent] =
    useState("");

  async function createLesson() {
    alert(
      "Lesson creation API coming next 🚀"
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl rounded-[32px] bg-white p-10 shadow-xl">
        {/* HEADER */}
        <h1 className="text-5xl font-extrabold text-[#0B1736]">
          Create Lesson
        </h1>

        <p className="mt-3 text-xl text-gray-500">
          Add new interactive coding lessons.
        </p>

        {/* FORM */}
        <div className="mt-10 space-y-6">
          {/* TITLE */}
          <div>
            <label className="text-lg font-bold">
              Lesson Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="mt-3 w-full rounded-2xl border border-gray-300 p-5 outline-none focus:border-green-500"
              placeholder="HTML Introduction"
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
              placeholder="Learn HTML basics..."
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
              className="mt-3 h-64 w-full rounded-2xl border border-gray-300 p-5 outline-none focus:border-green-500"
              placeholder="# HTML Introduction"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={createLesson}
            className="rounded-2xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105"
          >
            Create Lesson
          </button>
        </div>
      </div>
    </AppLayout>
  );
}