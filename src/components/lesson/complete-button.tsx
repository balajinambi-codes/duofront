"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  CheckCircle2,
  Loader2,
} from "lucide-react";

type Props = {
  userId: string;
  lessonId: string;
  alreadyCompleted?: boolean;
};

export default function CompleteButton({
  userId,
  lessonId,
  alreadyCompleted,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [completed, setCompleted] =
    useState(
      alreadyCompleted || false
    );

  async function completeLesson() {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/progress/complete",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId,
            lessonId,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setCompleted(true);

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={completeLesson}
      disabled={
        loading || completed
      }
      className={`flex items-center justify-center gap-3 rounded-2xl px-8 py-4 font-bold text-white shadow-lg transition ${
        completed
          ? "bg-green-500"
          : "bg-blue-500 hover:scale-105"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" />

          Completing...
        </>
      ) : completed ? (
        <>
          <CheckCircle2 />

          Completed
        </>
      ) : (
        "Complete Lesson"
      )}
    </button>
  );
}