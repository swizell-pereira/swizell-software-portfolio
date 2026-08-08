"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";

export default function WorkIndex() {
  return (
    <main className="pt-16">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Selected Engineering Work
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Architecture over screenshots.
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Problem → Solution → Impact — real products solving real problems.
            Personal projects include full architecture diagrams.
          </p>
        </motion.div>

        <div className="mt-16 space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${project.accent}`}
              />
              <Link
                href={`/work/${project.slug}`}
                className="group relative flex flex-col gap-4 py-12 transition-colors hover:bg-white/[0.02] lg:flex-row lg:items-start lg:justify-between lg:gap-12"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
                    0{index + 1} · {project.label}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-blue-100 md:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-400">
                    {project.tagline}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-400 transition-colors group-hover:text-white">
                  Read case study
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
