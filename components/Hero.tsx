"use client";

import { motion } from "framer-motion";
import Aurora from "./Aurora";
import { RESUME_FILENAME, RESUME_PATH } from "@/lib/site";

/** Curated snapshot — full stack lives in Technology Ecosystem */
const groups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Tailwind"],
  },
  {
    title: "Backend",
    items: ["Node.js", "NestJS", "Express", "Microservices"],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    title: "Messaging",
    items: ["Kafka", "RabbitMQ", "MQTT"],
  },
  {
    title: "Security & Platform",
    items: ["PKI / mTLS", "RBAC", "Docker", "Jest / Cypress"],
  },
];

const metrics = [
  { value: "5.5+", label: "Years Experience" },
  { value: "10+", label: "Initiatives Delivered" },
  { value: "6", label: "Engineers Led" },
  { value: "10+", label: "Engineers Mentored" },
  { value: "100+", label: "Tests Written" },
  { value: "95%", label: "Fewer Staging Bugs" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-8">
      <Aurora />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xs font-medium tracking-[0.25em] text-neutral-400 uppercase"
          >
            Available for full-time roles · Bangalore
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl xl:text-[92px]"
          >
            Building
            <br />
            <span className="text-white">digital</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
              experiences
            </span>
            <br />
            that scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-xl text-base leading-8 text-neutral-400 md:text-lg md:leading-9"
          >
            Designing scalable backend systems, high-performance web
            applications, and cloud-native architectures for FinTech, SaaS and
            Enterprise products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="rounded-xl bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(37,99,235,0.55)]"
            >
              Explore My Work
            </a>
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-white/25 hover:bg-white/[0.08]"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-blue-500/40 via-cyan-400/10 to-transparent opacity-60 blur-sm" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_80px_rgba(37,99,235,0.15)] backdrop-blur-xl sm:p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.07] via-transparent to-cyan-400/[0.04]" />

            <div className="relative">
              <p className="text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">
                Engineering Snapshot
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                Senior Software Engineer
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                In Time Tec · Jan 2021 – Jul 2026
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {groups.map((group) => (
                  <div key={group.title}>
                    <p className="text-[11px] font-medium tracking-wide text-blue-400">
                      {group.title}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-1.5 text-[12px] leading-snug text-neutral-300"
                        >
                          <span className="mt-0.5 text-blue-400">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3">
                  {metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-snug text-neutral-500">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
