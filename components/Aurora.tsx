"use client";

import { motion } from "framer-motion";

export default function Aurora() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 80, -80, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-0 top-0 h-[550px] w-[550px] rounded-full bg-blue-600/20 blur-[160px]"
      />

      <motion.div
        animate={{
          x: [0, -120, 50, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-20 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[180px]"
      />
    </>
  );
}
