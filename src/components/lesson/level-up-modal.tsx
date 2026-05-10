"use client";

import Confetti from "react-confetti";

import { motion } from "framer-motion";

type Props = {
  level: number;
};

export default function LevelUpModal({
  level,
}: Props) {
  return (
    <>
      <Confetti />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-6">
        <motion.div
          initial={{
            scale: 0.7,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          className="w-full max-w-lg rounded-[40px] bg-white p-10 text-center shadow-2xl"
        >
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-yellow-100 text-6xl">
            🚀
          </div>

          <h1 className="mt-8 text-5xl font-extrabold text-[#0B1736]">
            LEVEL UP!
          </h1>

          <p className="mt-5 text-2xl font-bold text-green-600">
            You reached Level {level}
          </p>

          <p className="mt-4 text-lg text-gray-500">
            Keep learning and unlock more coding powers.
          </p>
        </motion.div>
      </div>
    </>
  );
}