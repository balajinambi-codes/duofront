"use client";

import { motion } from "framer-motion";

import {
  getCurrentLevelXp,
  getXpForNextLevel,
} from "@/lib/level-system";

type Props = {
  xp: number;

  level: number;
};

export default function XpProgress({
  xp,
  level,
}: Props) {
  const currentLevelXp =
    getCurrentLevelXp(level);

  const nextLevelXp =
    getXpForNextLevel(level);

  const progress =
    ((xp - currentLevelXp) /
      (nextLevelXp -
        currentLevelXp)) *
    100;

  return (
    <div className="rounded-[32px] bg-white p-8 shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0B1736]">
            Level Progress
          </h2>

          <p className="mt-2 text-gray-500">
            Keep learning to level up 🚀
          </p>
        </div>

        <div className="rounded-2xl bg-green-100 px-5 py-3 text-2xl font-extrabold text-green-600">
          LVL {level}
        </div>
      </div>

      {/* BAR */}
      <div className="mt-8 h-6 overflow-hidden rounded-full bg-gray-200">
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 1,
          }}
          className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
        />
      </div>

      {/* XP */}
      <div className="mt-4 flex items-center justify-between text-sm font-bold text-gray-500">
        <span>
          {xp} XP
        </span>

        <span>
          {nextLevelXp} XP
        </span>
      </div>
    </div>
  );
}