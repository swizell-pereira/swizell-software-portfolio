"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    label: "Led a team of 6 engineers",
    detail: "Coding standards & structured reviews",
  },
  {
    label: "Mentored 10+ developers",
    detail: "30% improvement in code quality",
  },
  {
    label: "Delivered 10+ key initiatives",
    detail: "90% on-time · 95% fewer staging bugs",
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="relative px-6 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Leadership
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Leading teams that ship.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-12 max-w-3xl pl-0"
        >
          <p className="text-2xl font-medium leading-10 tracking-tight text-white md:text-3xl md:leading-[1.4]">
            Recognized by client stakeholders for exceptional contributions in
            delivering critical project components on high-visibility
            initiatives.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <p className="text-lg font-medium text-white">{item.label}</p>
              <p className="mt-2 text-sm text-neutral-500">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
