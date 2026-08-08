"use client";

import FlowCommerceDiagram from "@/components/diagrams/FlowCommerceDiagram";
import GenericArchitectureDiagram from "@/components/diagrams/GenericArchitectureDiagram";
import { DiagramScrollViewport } from "@/components/diagrams/primitives";
import type { Project, ProjectDiagramKey } from "@/lib/data/projects";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function Divider() {
  return <div className="my-10 h-px w-full bg-white/10" />;
}

function ProjectDiagram({ diagramKey }: { diagramKey: ProjectDiagramKey }) {
  switch (diagramKey) {
    case "flowcommerce":
      return <FlowCommerceDiagram />;
    case "fintech-monorepo":
      return (
        <GenericArchitectureDiagram
          steps={[
            "Browser",
            "Next.js",
            "API Services",
            "Plaid Integration",
            "PostgreSQL",
          ]}
          hint="Generic FinTech pattern — no proprietary client details."
        />
      );
    case "iot-gateway":
      return (
        <GenericArchitectureDiagram
          pattern="gateway"
          hint="Generic IoT gateway pattern — no proprietary client details."
        />
      );
    case "payment-platform":
      return (
        <GenericArchitectureDiagram
          steps={[
            "Vue.js Frontend",
            "Node.js API",
            "Payment Services",
            "MongoDB",
          ]}
          hint="Generic payment platform pattern — no proprietary client details."
        />
      );
    default:
      return null;
  }
}

type ProjectPageProps = {
  project: Project;
  index: number;
};

export default function ProjectPage({ project, index }: ProjectPageProps) {
  return (
    <article className="relative">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${project.accent}`}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
            0{index + 1} · {project.label}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">
            {project.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/[0.06] px-3.5 py-1.5 text-sm text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <Divider />

        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
            Challenge
          </p>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-300">
            {project.problem}
          </p>
          <ul className="mt-6 space-y-2.5">
            {project.challenges.map((c) => (
              <li
                key={c}
                className="flex gap-2 text-[15px] leading-7 text-neutral-300"
              >
                <span className="text-blue-400">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <Divider />

        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
            Engineering Decisions
          </p>
          <ul className="mt-4 space-y-2.5">
            {project.decisions.map((d) => (
              <li
                key={d}
                className="flex gap-2 text-[15px] leading-7 text-neutral-300"
              >
                <span className="text-blue-400">✓</span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        <Divider />

        <div>
          <p className="mb-5 text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
            Architecture
          </p>
          <DiagramScrollViewport>
            <ProjectDiagram diagramKey={project.diagramKey} />
          </DiagramScrollViewport>
        </div>

        <Divider />

        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
            Impact
          </p>
          <ul className="mt-4 space-y-2.5">
            {project.impact.map((c) => (
              <li
                key={c}
                className="flex gap-2 text-[15px] leading-7 text-neutral-300"
              >
                <span className="text-blue-400">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {project.githubHref ? (
          <>
            <Divider />
            <div className="flex flex-wrap gap-3">
              <a
                href={project.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
              >
                GitHub
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
