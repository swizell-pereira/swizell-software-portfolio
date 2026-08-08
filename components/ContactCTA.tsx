"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_FILENAME,
  RESUME_PATH,
  SITE_EMAIL,
} from "@/lib/site";

export default function ContactCTA() {
  return (
    <section id="contact" className="relative px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Contact
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Let&apos;s build something
            <br />
            great together.
          </h2>

          <a
            href={`mailto:${SITE_EMAIL}`}
            className="mt-8 inline-flex items-center gap-3 text-lg text-neutral-300 transition hover:text-white md:text-xl"
          >
            <Mail className="size-5 shrink-0 text-[#2563EB]" />
            {SITE_EMAIL}
          </a>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.1]"
            >
              LinkedIn
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.1]"
            >
              GitHub
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_40px_rgba(37,99,235,0.45)]"
            >
              Download Resume
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
