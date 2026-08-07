"use client";

import { motion } from "framer-motion";

export default function WhoIAm() {
  return (
    <section id="who" className="relative px-6 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Who I Am
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Engineering Philosophy
          </h2>

          <p className="mt-8 text-lg leading-9 text-neutral-400">
            I enjoy building software that is simple for users and scalable for
            engineering teams.
          </p>

          <p className="mt-6 text-lg leading-9 text-neutral-400">
            Whether I&apos;m designing a Backend-for-Frontend architecture,
            building distributed microservices, securing IoT fleets with PKI and
            mTLS, or creating modern React and Vue interfaces — my goal is the
            same:
          </p>

          <p className="mt-8 text-xl font-medium leading-9 text-white md:text-2xl">
            Build systems that are reliable, maintainable and enjoyable to use.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
