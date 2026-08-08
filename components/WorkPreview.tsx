"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";

export default function WorkPreview() {
  return (
    <section id="work" className="relative px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Selected Engineering Work
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Architecture over screenshots.
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Problem → Solution → Impact — real products solving real problems.
          </p>
        </motion.div>

        <div className="mt-12 space-y-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-3 rounded-2xl py-8 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-start sm:justify-between sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
                    0{index + 1} · {project.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-blue-100 sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[15px] leading-7 text-neutral-400">
                    {project.tagline}
                  </p>
                  <p className="mt-3 text-sm text-neutral-500">
                    {project.tech.slice(0, 5).join(" · ")}
                    {project.tech.length > 5
                      ? ` · +${project.tech.length - 5}`
                      : ""}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors group-hover:text-white">
                  View project
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            View all work
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
