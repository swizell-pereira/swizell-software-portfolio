"use client";

import { motion } from "framer-motion";
import DiagramContainer from "@/components/DiagramContainer";

export default function SystemDesignPlayground() {
  return (
    <section id="playground" className="relative px-6 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            System Design Playground
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            How I think in systems.
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Interactive architecture — the way senior engineers explain
            decisions. Hover nodes to animate request paths, tokens, and
            message flow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <DiagramContainer />
        </motion.div>
      </div>
    </section>
  );
}
