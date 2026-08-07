"use client";

import { motion } from "framer-motion";

export default function Recognition() {
  return (
    <section id="recognition" className="relative px-6 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl border-l border-[#2563EB]/50 pl-8"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Recognition
          </p>
          <p className="text-2xl font-medium leading-10 tracking-tight text-white md:text-3xl md:leading-[1.4]">
            Recognized by client stakeholders for exceptional contributions in
            delivering critical project components on high-visibility
            initiatives.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
