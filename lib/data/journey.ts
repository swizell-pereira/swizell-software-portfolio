export type JourneyMilestone = {
  id: string;
  date: string;
  /** e.g. Promotion, Focus, or project name highlight */
  badge?: string;
  role: string;
  project?: string;
  learned: string[];
  built: string[];
  outcome: string;
  nextChallenge: string;
  finalQuote?: string;
  isPromotion?: boolean;
  isFinal?: boolean;
};

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "m1",
    date: "January 2021",
    role: "Trainee Software Engineer",
    learned: [
      "JavaScript fundamentals",
      "TypeScript",
      "Node.js",
      "REST API basics",
      "Git workflow",
    ],
    built: [
      "Internal backend tasks",
      "Small API features",
      "Bug fixes",
      "Development fundamentals",
    ],
    outcome:
      "Built a strong foundation in backend development and learned how professional software teams work.",
    nextChallenge: "Contribute to a real production project.",
  },
  {
    id: "m2",
    date: "April 2021",
    badge: "Sekady",
    role: "Backend Developer",
    project: "Sekady",
    learned: [
      "Production backend development",
      "Express.js",
      "MongoDB",
      "API design",
    ],
    built: [
      "REST APIs",
      "Backend modules",
      "Database queries",
      "Production features",
    ],
    outcome: "Began contributing to customer-facing production software.",
    nextChallenge: "Expand into frontend development.",
  },
  {
    id: "m3",
    date: "Mid 2021",
    role: "Full Stack Contributor",
    learned: [
      "Vue.js",
      "Frontend architecture",
      "Component-based development",
    ],
    built: ["UI features", "Frontend bug fixes", "API integrations"],
    outcome:
      "Became comfortable contributing across both frontend and backend.",
    nextChallenge: "Grow into a stronger software engineer.",
  },
  {
    id: "m4",
    date: "Late 2021",
    badge: "Promotion",
    role: "Junior Software Engineer",
    isPromotion: true,
    learned: [
      "Clean Code by Robert C. Martin",
      "Software craftsmanship",
      "Code readability",
      "SOLID principles",
    ],
    built: ["Cleaner implementations", "Better architecture decisions"],
    outcome:
      "Started thinking like an engineer rather than just a programmer.",
    nextChallenge: "Improve software quality.",
  },
  {
    id: "m5",
    date: "January 2022",
    badge: "Testing",
    role: "Junior Software Engineer",
    learned: ["Jest", "Unit testing", "Test-driven thinking"],
    built: ["Unit tests", "Better test coverage"],
    outcome: "Reduced regressions and improved code confidence.",
    nextChallenge: "Learn end-to-end testing.",
  },
  {
    id: "m6",
    date: "April 2022",
    badge: "Promotion",
    role: "Software Engineer",
    isPromotion: true,
    learned: [
      "Cypress",
      "API investigation",
      "Database debugging",
      "Root cause analysis",
    ],
    built: [
      "End-to-end tests",
      "Production debugging",
      "Database investigations",
    ],
    outcome: "Solved more complex production issues independently.",
    nextChallenge: "Build enterprise FinTech products.",
  },
  {
    id: "m7",
    date: "December 2022",
    badge: "Tidal Money",
    role: "Software Engineer",
    project: "Tidal Money",
    learned: [
      "Vue 3",
      "FinTech workflows",
      "Payment systems",
      "Component architecture",
    ],
    built: [
      "Production FinTech features",
      "Frontend modules",
      "Secure workflows",
    ],
    outcome: "Worked on scalable financial software used by real customers.",
    nextChallenge: "Lead larger engineering initiatives.",
  },
  {
    id: "m8",
    date: "April 2024",
    badge: "Promotion",
    role: "Senior Software Engineer",
    isPromotion: true,
    learned: [
      "Technical leadership",
      "Mentoring",
      "Code reviews",
      "System thinking",
    ],
    built: [
      "Larger features",
      "Mentored junior engineers",
      "Improved engineering quality",
    ],
    outcome:
      "Transitioned from feature development to engineering ownership.",
    nextChallenge: "Modern backend architecture.",
  },
  {
    id: "m9",
    date: "February 2025",
    badge: "NestJS & Microservices",
    role: "Senior Software Engineer",
    learned: [
      "NestJS",
      "Dependency Injection",
      "Microservices",
      "Event-driven architecture",
    ],
    built: ["Backend services", "Scalable APIs", "Distributed systems"],
    outcome:
      "Expanded from monolithic applications into distributed architectures.",
    nextChallenge: "Large enterprise platforms.",
  },
  {
    id: "m10",
    date: "May 2025",
    badge: "Dubai Future Foundation",
    role: "Senior Software Engineer",
    project: "Dubai Future Foundation",
    learned: [
      "RabbitMQ",
      "Redis",
      "PKI",
      "mTLS",
      "BFF architecture",
      "Robotics platform architecture",
    ],
    built: [
      "Secure backend services",
      "Authentication",
      "Distributed communication",
      "Enterprise integrations",
    ],
    outcome:
      "Worked on enterprise-grade distributed systems with high security requirements.",
    nextChallenge: "Modern React ecosystem.",
  },
  {
    id: "m11",
    date: "February 2026",
    badge: "Money Journeys",
    role: "Senior Software Engineer",
    project: "Money Journeys",
    learned: [
      "Next.js",
      "React Server Components",
      "Supabase",
      "TanStack Query",
      "Modern React architecture",
    ],
    built: [
      "Production SaaS features",
      "Responsive UI",
      "Secure backend integration",
    ],
    outcome:
      "Strengthened modern full-stack engineering skills across frontend and backend.",
    nextChallenge: "Build products from scratch.",
  },
  {
    id: "m12",
    date: "Today",
    badge: "FlowCommerce",
    role: "Founder & Engineer",
    project: "FlowCommerce",
    isFinal: true,
    learned: [
      "Product architecture",
      "Multi-tenant SaaS",
      "System design",
      "Product thinking",
    ],
    built: [
      "Complete SaaS platform",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "RabbitMQ",
      "Redis",
    ],
    outcome:
      "Applying everything learned over the last 5.7 years to build software from the ground up.",
    nextChallenge: "Ship what I build.",
    finalQuote:
      "The best engineers aren't defined by the languages they know. They're defined by the problems they're able to solve.",
  },
];

export const journeyCount = journeyMilestones.length;
