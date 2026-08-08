"use client";

import { motion } from "framer-motion";
import DiagramContainer from "@/components/DiagramContainer";

export default function SystemsContent() {
  return (
    <section className="relative px-4 py-12 sm:px-6 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 max-w-3xl md:mb-12"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            How I Design Systems
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            How I think in systems.
          </h1>
          <p className="mt-4 text-base leading-7 text-neutral-400 md:mt-6 md:text-lg md:leading-8">
            Interactive architecture — the way senior engineers explain
            decisions. Hover nodes to animate request paths, tokens, and
            message flow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <DiagramContainer />
        </motion.div>
      </div>
    </section>
  );
}
