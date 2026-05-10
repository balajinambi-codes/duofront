"use client";

import { useState } from "react";

import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Props = {
  question: string;

  options: string[];

  correctAnswer: string;

  explanation?: string;
};

export default function QuizCard({
  question,
  options,
  correctAnswer,
  explanation,
}: Props) {
  const [selected, setSelected] =
    useState<string | null>(null);

  const [submitted, setSubmitted] =
    useState(false);

  const correct =
    selected === correctAnswer;

  function submitAnswer() {
    if (!selected) return;

    setSubmitted(true);
  }

  return (
    <div className="mt-12 rounded-[32px] bg-white p-8 shadow-xl">
      {/* TITLE */}
      <h2 className="text-3xl font-extrabold text-[#0B1736]">
        Quick Quiz
      </h2>

      {/* QUESTION */}
      <p className="mt-6 text-xl font-semibold text-gray-700">
        {question}
      </p>

      {/* OPTIONS */}
      <div className="mt-8 space-y-4">
        {options.map((option) => {
          const active =
            selected === option;

          return (
            <button
              key={option}
              onClick={() =>
                setSelected(option)
              }
              className={`w-full rounded-2xl border p-5 text-left font-bold transition ${
                active
                  ? "border-green-500 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* SUBMIT */}
      {!submitted && (
        <button
          onClick={submitAnswer}
          className="mt-8 rounded-2xl bg-green-500 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105"
        >
          Submit Answer
        </button>
      )}

      {/* RESULT */}
      {submitted && (
        <div
          className={`mt-8 rounded-2xl p-6 ${
            correct
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          <div className="flex items-center gap-3 text-2xl font-extrabold">
            {correct ? (
              <>
                <CheckCircle2 className="text-green-600" />

                <span className="text-green-600">
                  Correct Answer!
                </span>
              </>
            ) : (
              <>
                <XCircle className="text-red-600" />

                <span className="text-red-600">
                  Wrong Answer
                </span>
              </>
            )}
          </div>

          {/* EXPLANATION */}
          {explanation && (
            <p className="mt-4 text-lg text-gray-700">
              {explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}