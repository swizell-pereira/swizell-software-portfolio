"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_FILENAME,
  RESUME_PATH,
} from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 md:px-8">
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

          <div className="mt-10 space-y-3">
            <a
              href="mailto:swizellpereira14@gmail.com"
              className="flex items-center gap-3 text-lg text-neutral-300 transition hover:text-white md:text-xl"
            >
              <Mail className="size-5 shrink-0 text-[#2563EB]" />
              swizellpereira14@gmail.com
            </a>
            <a
              href="tel:+917020267738"
              className="flex items-center gap-3 text-base text-neutral-400 transition hover:text-white"
            >
              <Phone className="size-4 shrink-0 text-neutral-500" />
              +91 70202 67738
            </a>
            <p className="pl-8 text-sm text-neutral-500">Bangalore, India</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.08]"
            >
              LinkedIn
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.08]"
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

      <div className="mx-auto mt-24 max-w-7xl border-t border-white/10 pt-8">
        <p className="text-sm text-neutral-600">
          © {new Date().getFullYear()} Swizell Pereira
        </p>
      </div>
    </section>
  );
}
