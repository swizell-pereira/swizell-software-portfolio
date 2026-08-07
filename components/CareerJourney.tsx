"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "Jan 2021",
    label: "Junior Software Engineer",
    detail: "In Time Tec · Bangalore",
  },
  {
    year: "",
    label: "Software Engineer",
    detail: "FinTech, SaaS & IoT platforms",
  },
  {
    year: "",
    label: "Senior Software Engineer",
    detail: "Architecture · BFF · Microservices",
  },
  {
    year: "",
    label: "Led a team of 6 engineers",
    detail: "Coding standards & structured reviews",
  },
  {
    year: "",
    label: "Mentored 10+ developers",
    detail: "30% improvement in code quality",
  },
  {
    year: "",
    label: "Delivered 10+ key initiatives",
    detail: "90% on-time · 95% fewer staging bugs",
  },
  {
    year: "Jul 2026",
    label: "Open to full-time roles",
    detail: "Bangalore · Remote-friendly",
  },
];

export default function CareerJourney() {
  return (
    <section id="journey" className="relative px-6 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Career Journey
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Five years at In Time Tec.
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Progressed from Junior Software Engineer to Senior Software Engineer
            — architecting FinTech, SaaS, and IoT platforms across Node.js,
            NestJS, React, Next.js, and Vue.js.
          </p>
        </motion.div>

        <div className="mt-16 max-w-2xl">
          {milestones.map((item, i) => (
            <motion.div
              key={`${item.label}-${i}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`size-3 shrink-0 rounded-full ${
                    i === milestones.length - 1
                      ? "bg-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.8)]"
                      : "bg-white/30"
                  }`}
                />
                {i < milestones.length - 1 ? (
                  <div className="mt-2 h-full w-px flex-1 bg-white/10" />
                ) : null}
              </div>
              <div className="-mt-1.5 pb-2">
                {item.year ? (
                  <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                    {item.year}
                  </p>
                ) : null}
                <p
                  className={`text-lg font-medium ${
                    i === milestones.length - 1
                      ? "text-white"
                      : "text-neutral-300"
                  }`}
                >
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-neutral-500">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
