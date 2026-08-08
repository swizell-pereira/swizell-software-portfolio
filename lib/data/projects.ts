export type ProjectDiagramKey =
  | "flowcommerce"
  | "fintech-monorepo"
  | "iot-gateway"
  | "payment-platform";

export type Project = {
  slug: string;
  label: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  role?: string;
  challenges: string[];
  decisions: string[];
  impact: string[];
  tech: string[];
  diagramKey: ProjectDiagramKey;
  githubHref?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "flowcommerce",
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
    decisions: [
      "DDD modular monolith over premature microservices — one deployable unit with extractable bounded contexts",
      "Event-driven subscription and payment flows via RabbitMQ for reliable async processing",
      "Immutable financial records with comprehensive audit trails for compliance",
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
    diagramKey: "flowcommerce",
    githubHref: "https://github.com/swizell-pereira/flow-commerce",
    accent: "from-blue-500/20 via-transparent to-transparent",
  },
  {
    slug: "moneyjourneys",
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
    decisions: [
      "Production monorepo with clear service boundaries for independent shipping",
      "Plaid integration for bank connectivity — industry-standard OAuth, no raw credential storage",
      "Shared types and contracts across services to reduce cross-team release friction",
    ],
    impact: [
      "Users no longer manually enter transactions to track goals",
      "Real-time savings progress visible in production",
      "Independent service deploys reduced cross-team release friction",
    ],
    tech: ["Next.js", "React", "Supabase", "PostgreSQL", "Plaid", "Docker"],
    diagramKey: "fintech-monorepo",
    accent: "from-emerald-500/15 via-transparent to-transparent",
  },
  {
    slug: "dff",
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
    decisions: [
      "Gateway-based auth with PKI/mTLS unified fleet access without coupling device protocols to user management",
      "RBAC at the API gateway layer for centralized access control",
      "Async orchestration via Kafka and RabbitMQ for workflow coordination at fleet scale",
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
    diagramKey: "iot-gateway",
    accent: "from-cyan-400/20 via-transparent to-transparent",
  },
  {
    slug: "sekady",
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
    decisions: [
      "Node.js + MongoDB for flexible payment schema evolution without migration friction",
      "Comprehensive Jest/Cypress test pyramid for zero-failure payment flows",
      "Coding standards and structured reviews as the team scaled to 6 engineers",
    ],
    impact: [
      "30+ APIs powering business-critical payment workflows in production",
      "95% reduction in staging bugs through testing discipline",
      "90% on-time delivery across major initiatives · mentored 10+ developers",
    ],
    tech: ["Node.js", "TypeScript", "Vue.js", "MongoDB", "Jest", "Cypress"],
    diagramKey: "payment-platform",
    accent: "from-sky-500/15 via-transparent to-transparent",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectIndex(slug: string): number {
  return projects.findIndex((p) => p.slug === slug);
}
