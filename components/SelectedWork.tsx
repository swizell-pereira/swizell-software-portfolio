"use client";

import { type ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FlowCommerceDiagram from "@/components/diagrams/FlowCommerceDiagram";

type Project = {
  id: string;
  label: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  role?: string;
  challenges: string[];
  impact: string[];
  tech: string[];
  Diagram?: ComponentType;
  githubHref?: string;
  accent: string;
};

const projects: Project[] = [
  {
    id: "flowcommerce",
    label: "Personal · Multi-tenant SaaS",
    title: "FLOWCOMMERCE",
    tagline:
      "A production-grade multi-tenant SaaS platform for fitness businesses.",
    problem:
      "Managing memberships, subscriptions, payments and attendance across multiple branches is difficult.",
    solution:
      "Designed a modular Next.js + NestJS platform using Domain-Driven Design — a modular monolith ready for microservice extraction.",
    challenges: [
      "Multi-tenant isolation across gym chains without fragmenting the codebase",
      "Immutable financial records, invoicing, and comprehensive audit trails",
      "Event-driven subscription & payment workflows via RabbitMQ",
    ],
    impact: [
      "Full gym lifecycle: membership → subscription → payment → attendance",
      "DDD modular monolith — extractable to microservices when scale demands",
      "Dockerized deploy with health checks, Swagger, Redis cache, and CI/CD foundation",
    ],
    tech: [
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "TypeScript",
      "Swagger",
      "Docker",
    ],
    Diagram: FlowCommerceDiagram,
    githubHref: "https://github.com/swizell-pereira/flow-commerce",
    accent: "from-blue-500/20 via-transparent to-transparent",
  },
  {
    id: "moneyjourneys",
    label: "Client · FinTech",
    title: "Money Journeys",
    tagline:
      "A financial planning app that helps people set savings goals and see whether they're actually on track — updated automatically from their real accounts.",
    problem:
      "Most people save toward specific goals — an emergency fund, a vacation, a down payment — but progress lives across bank apps, spreadsheets, and memory. Without a single view of spending vs. goals, it's easy to fall behind without noticing until it's too late.",
    solution:
      "Money Journeys brings goal-based financial planning into one place. Users define what they're saving for, connect their bank accounts securely, and watch transactions categorize automatically so progress updates in real time — no manual logging.",
    role:
      "Built features across the frontend, backend, and data layer in a production monorepo. Integrated Plaid for bank connectivity and automated transaction categorization, removing manual data entry for end users.",
    challenges: [
      "Real-time progress updates as new transactions arrive",
      "Secure handling of sensitive financial data via third-party bank APIs",
      "Shipping reliably across a distributed team in a multi-service codebase",
    ],
    impact: [
      "Users no longer manually enter transactions to track goals",
      "Real-time savings progress visible in production",
      "Independent service deploys reduced cross-team release friction",
    ],
    tech: ["Next.js", "React", "Supabase", "PostgreSQL", "Plaid", "Docker"],
    accent: "from-emerald-500/15 via-transparent to-transparent",
  },
  {
    id: "dff",
    label: "Client · Enterprise IoT",
    title: "Dubai Future Foundation",
    tagline:
      "A government-scale platform for teams managing fleets of connected robotic systems — secure, coordinated, and built for production reliability.",
    problem:
      "Operations teams running large fleets of connected devices face a daily challenge: onboarding new units securely, controlling who can access what, and coordinating workflows across many systems — all without manual overhead that doesn't scale.",
    solution:
      "The platform gives administrators a unified way to manage device fleets, control user access, and automate operational workflows — so teams spend less time on manual setup and more time running missions.",
    role:
      "Contributed to gateway-based authentication, session management, and service integration across a distributed NestJS backend. Built secure multi-tenant APIs for user and fleet management with role-based access control.",
    challenges: [
      "Secure device lifecycle management at fleet scale",
      "Coordinating async workflows across multiple backend services",
      "Building reliable, production-grade APIs for high-visibility government initiatives",
    ],
    impact: [
      "Centralized authentication replaced fragmented access patterns",
      "Automated secure device onboarding reduced manual renewal overhead",
      "Recognized by client stakeholders for critical delivery on high-visibility work",
    ],
    tech: [
      "NestJS",
      "Redis",
      "RabbitMQ",
      "MQTT",
      "Kafka",
      "Prisma",
      "PostgreSQL",
      "OpenSSL",
      "Docker",
    ],
    accent: "from-cyan-400/20 via-transparent to-transparent",
  },
  {
    id: "sekady",
    label: "Client · FinTech / SaaS",
    title: "Sekady Platform",
    tagline:
      "An enterprise payment platform that helps businesses move money securely — ACH, wire transfers, and project-based payment workflows in one system.",
    problem:
      "Construction firms and enterprise teams deal with slow, fragmented payment processes every day. Vendors wait on ACH and wire transfers tracked across spreadsheets. One missed step delays a contractor getting paid — and erodes trust.",
    solution:
      "Sekady gives businesses a single platform to initiate, track, and process secure payments — whether it's ACH, wire transfers, or complex construction payment workflows — with reliability built in from the start.",
    role:
      "Built 30+ production backend APIs and core product features. Led a team of 6 engineers, established coding standards and review practices, and drove comprehensive Jest/Cypress test coverage.",
    challenges: [
      "Payment flows where failure is not an option",
      "Maintaining quality as the team and codebase grew",
      "Delivering 10+ major initiatives on tight timelines",
    ],
    impact: [
      "30+ APIs powering business-critical payment workflows in production",
      "95% reduction in staging bugs through testing discipline",
      "90% on-time delivery across major initiatives · mentored 10+ developers",
    ],
    tech: ["Node.js", "TypeScript", "Vue.js", "MongoDB", "Jest", "Cypress"],
    accent: "from-sky-500/15 via-transparent to-transparent",
  },
];

function Divider() {
  return <div className="my-10 h-px w-full bg-white/10" />;
}

export default function SelectedWork() {
  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-8">
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
            Personal projects include full architecture diagrams.
          </p>
        </motion.div>
      </div>

      <div className="mt-10">
        {projects.map((project, index) => (
          <article
            key={project.id}
            id={project.id}
            className="relative border-t border-white/10"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${project.accent}`}
            />

            <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 lg:py-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55 }}
              >
                <p className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
                  0{index + 1} · {project.label}
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">
                  {project.tagline}
                </p>
              </motion.div>

              <Divider />

              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                    Problem
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-neutral-300">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                    Solution
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-neutral-300">
                    {project.solution}
                  </p>
                </div>
              </div>

              {project.role ? (
                <>
                  <Divider />
                  <div>
                    <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                      My Contribution
                    </p>
                    <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-300">
                      {project.role}
                    </p>
                  </div>
                </>
              ) : null}

              {project.Diagram ? (
                <>
                  <Divider />
                  <div>
                    <p className="mb-5 text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                      Architecture
                    </p>
                    <project.Diagram />
                  </div>
                </>
              ) : null}

              <Divider />

              <div>
                <p className="mb-4 text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                  Tech
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <Divider />

              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                    Challenges
                  </p>
                  <ul className="mt-4 space-y-2.5">
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
              </div>

              {project.githubHref ? (
                <>
                  <Divider />
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                    >
                      GitHub
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
