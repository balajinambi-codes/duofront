"use client";

import {
  useEffect,
  useState,
} from "react";

import Editor from "@monaco-editor/react";

import { validateCode } from "@/lib/validate-code";

import {
  getLevelFromXp,
} from "@/lib/level-system";

import LevelUpModal from "./level-up-modal";

import XpPopup from "./xp-popup";

import {
  Play,
  RotateCcw,
  Save,
  CheckCircle2,
} from "lucide-react";

type Props = {
  userId?: string;

  lessonId?: string;

  lessonSlug?: string;

  challengeTitle?: string;

  challengeDescription?: string;

  validationChecks?: string[];

  defaultHtml?: string;

  defaultCss?: string;

  defaultJs?: string;
};

export default function CodePlayground({
  userId,

  lessonId,

  lessonSlug = "default",

  challengeTitle = "Mini Challenge",

  challengeDescription =
    "Complete the coding challenge below.",

  validationChecks = [],

  defaultHtml = "",

  defaultCss = "",

  defaultJs = "",
}: Props) {
  /*
    LOCAL STORAGE KEYS
  */
  const htmlKey = `${lessonSlug}-html`;

  const cssKey = `${lessonSlug}-css`;

  const jsKey = `${lessonSlug}-js`;

  /*
    STATES
  */
  const [html, setHtml] =
    useState(defaultHtml);

  const [css, setCss] =
    useState(defaultCss);

  const [js, setJs] =
    useState(defaultJs);

  const [srcDoc, setSrcDoc] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [xpEarned, setXpEarned] =
    useState<number | null>(null);

  const [levelUp, setLevelUp] =
    useState<number | null>(null);

  /*
    LOAD SAVED CODE
  */
  useEffect(() => {
    const savedHtml =
      localStorage.getItem(htmlKey);

    const savedCss =
      localStorage.getItem(cssKey);

    const savedJs =
      localStorage.getItem(jsKey);

    if (savedHtml) {
      setHtml(savedHtml);
    }

    if (savedCss) {
      setCss(savedCss);
    }

    if (savedJs) {
      setJs(savedJs);
    }
  }, []);

  /*
    AUTO SAVE
  */
  useEffect(() => {
    localStorage.setItem(
      htmlKey,
      html
    );

    localStorage.setItem(
      cssKey,
      css
    );

    localStorage.setItem(
      jsKey,
      js
    );
  }, [html, css, js]);

  /*
    RUN CODE
  */
  async function runCode() {
    const source = `
      <html>
        <head>
          <style>
            ${css}
          </style>
        </head>

        <body>
          ${html}

          <script>
            ${js}
          </script>
        </body>
      </html>
    `;

    setSrcDoc(source);

    /*
      VALIDATION
    */
    if (
      validationChecks.length > 0
    ) {
      const valid =
        validateCode({
          html,
          css,
          js,
          checks:
            validationChecks,
        });

      setSuccess(valid);

      /*
        AUTO COMPLETE LESSON
      */
      if (
        valid &&
        userId &&
        lessonId
      ) {
        try {
          const response =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/progress/complete`,
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

          /*
            XP REWARD
          */
          if (
            data?.xpEarned
          ) {
            setXpEarned(
              data.xpEarned
            );

            /*
              LEVEL CHECK
            */
            if (
              data?.totalXp
            ) {
              const newLevel =
                getLevelFromXp(
                  data.totalXp
                );

              if (
                newLevel >
                (data.previousLevel ||
                  1)
              ) {
                setLevelUp(
                  newLevel
                );
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  /*
    RESET CODE
  */
  function resetCode() {
    setHtml(defaultHtml);

    setCss(defaultCss);

    setJs(defaultJs);

    setSuccess(false);

    setXpEarned(null);

    setLevelUp(null);

    localStorage.removeItem(
      htmlKey
    );

    localStorage.removeItem(
      cssKey
    );

    localStorage.removeItem(
      jsKey
    );

    setSrcDoc("");
  }

  return (
    <div className="mt-12 overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-xl">
      {/* LEVEL UP */}
      {levelUp && (
        <LevelUpModal
          level={levelUp}
        />
      )}

      {/* TOPBAR */}
      <div className="flex flex-col gap-4 border-b border-gray-200 bg-[#F8FAFC] p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0B1736]">
            Interactive Playground
          </h2>

          <p className="mt-1 text-gray-500">
            Practice code live
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-3">
          {/* RUN */}
          <button
            onClick={runCode}
            className="flex items-center gap-2 rounded-2xl bg-green-500 px-6 py-3 font-bold text-white shadow-lg transition hover:scale-105"
          >
            <Play size={18} />

            Run
          </button>

          {/* RESET */}
          <button
            onClick={resetCode}
            className="flex items-center gap-2 rounded-2xl bg-gray-200 px-6 py-3 font-bold transition hover:bg-gray-300"
          >
            <RotateCcw size={18} />

            Reset
          </button>

          {/* AUTO SAVE */}
          <div className="flex items-center gap-2 rounded-2xl bg-blue-100 px-5 py-3 font-bold text-blue-600">
            <Save size={18} />

            Auto Saved
          </div>
        </div>
      </div>

      {/* CHALLENGE */}
      <div className="border-b border-gray-200 bg-yellow-50 p-6">
        <h3 className="text-2xl font-extrabold text-yellow-700">
          {challengeTitle}
        </h3>

        <p className="mt-3 text-yellow-600">
          {
            challengeDescription
          }
        </p>

        {success && (
          <div className="mt-5 rounded-2xl bg-green-100 px-5 py-4">
            <div className="flex items-center gap-3 font-bold text-green-600">
              <CheckCircle2 />

              Challenge Completed!
            </div>

            {xpEarned && (
              <p className="mt-2 text-lg font-bold text-yellow-600">
                +{xpEarned} XP Earned 🚀
              </p>
            )}
          </div>
        )}
      </div>

      {/* EDITORS */}
      <div className="grid grid-cols-1 xl:grid-cols-3">
        {/* HTML */}
        <div className="border-b border-r border-gray-200 xl:border-b-0">
          <div className="bg-orange-100 px-4 py-3 font-bold text-orange-600">
            HTML
          </div>

          <Editor
            height="350px"
            defaultLanguage="html"
            value={html}
            onChange={(value) =>
              setHtml(value || "")
            }
            theme="vs-dark"
          />
        </div>

        {/* CSS */}
        <div className="border-b border-r border-gray-200 xl:border-b-0">
          <div className="bg-blue-100 px-4 py-3 font-bold text-blue-600">
            CSS
          </div>

          <Editor
            height="350px"
            defaultLanguage="css"
            value={css}
            onChange={(value) =>
              setCss(value || "")
            }
            theme="vs-dark"
          />
        </div>

        {/* JS */}
        <div>
          <div className="bg-yellow-100 px-4 py-3 font-bold text-yellow-600">
            JavaScript
          </div>

          <Editor
            height="350px"
            defaultLanguage="javascript"
            value={js}
            onChange={(value) =>
              setJs(value || "")
            }
            theme="vs-dark"
          />
        </div>
      </div>

      {/* XP POPUP */}
      {xpEarned && (
        <XpPopup xp={xpEarned} />
      )}

      {/* LIVE PREVIEW */}
      <div className="border-t border-gray-200">
        <div className="bg-green-100 px-4 py-3 font-bold text-green-600">
          Live Preview
        </div>

        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="400px"
          className="bg-white"
        />
      </div>
    </div>
  );
}