"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RESUME_FILENAME, RESUME_PATH } from "@/lib/site";

export default function ResumeSection() {
  return (
    <section id="resume" className="relative px-6 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Resume
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Full experience, one document.
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Download a PDF summary of my engineering background, leadership
            experience, and technical skills.
          </p>
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white transition hover:shadow-[0_0_40px_rgba(37,99,235,0.45)]"
          >
            Download Resume
            <ArrowUpRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
