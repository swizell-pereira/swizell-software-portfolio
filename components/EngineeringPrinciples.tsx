"use client";

import { motion } from "framer-motion";

const principles = [
  "Build for scale.",
  "Think in systems.",
  "Performance is a feature.",
  "Security is never optional.",
  "Write code for the next engineer.",
  "Ship quality over quantity.",
];

export default function EngineeringPrinciples() {
  return (
    <section id="principles" className="relative px-6 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Engineering Principles
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            How I think about software.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-0 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, i) => (
            <motion.div
              key={principle}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="border-b border-white/10 px-0 py-8 sm:border-r sm:px-8 sm:odd:pl-0 lg:[&:nth-child(3n)]:border-r-0"
            >
              <p className="font-mono text-xs text-neutral-600">
                0{i + 1}
              </p>
              <p className="mt-3 text-xl font-medium tracking-tight text-white">
                {principle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
