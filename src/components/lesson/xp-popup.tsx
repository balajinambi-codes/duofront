"use client";

import { motion } from "framer-motion";

type Props = {
  xp: number;
};

export default function XpPopup({
  xp,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -40,
      }}
      transition={{
        duration: 0.5,
      }}
      className="fixed bottom-10 right-10 z-[9999] rounded-3xl bg-yellow-400 px-8 py-5 text-2xl font-extrabold text-white shadow-2xl"
    >
      🚀 +{xp} XP
    </motion.div>
  );
}