"use client";

import { motion } from "framer-motion";

const layers = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript"],
  },
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Vue.js (2 & 3)",
      "TanStack Query",
      "Redux",
      "Vuex",
      "Vuetify",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "REST APIs",
      "Microservices",
      "Event-Driven Architecture",
      "BFF",
    ],
  },
  {
    title: "Messaging",
    items: ["Apache Kafka", "RabbitMQ", "MQTT"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma", "Mongoose"],
  },
  {
    title: "Security",
    items: ["PKI / mTLS", "OpenSSL", "RBAC", "JWT"],
  },
  {
    title: "Quality",
    items: ["Jest", "Cypress", "SuperTest"],
  },
  {
    title: "Platform",
    items: ["Docker", "CI/CD", "Git", "Bitbucket", "Postman"],
  },
];

export default function TechnologyEcosystem() {
  return (
    <section id="ecosystem" className="relative px-6 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#2563EB] uppercase">
            Technology Ecosystem
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Technologies powering the products I build.
          </h2>
        </motion.div>

        <div className="mt-16 space-y-0">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="grid gap-4 py-7 md:grid-cols-[180px_1fr] md:items-center"
            >
              <p className="text-sm font-medium tracking-wide text-neutral-500">
                {layer.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/[0.06] px-3.5 py-1.5 text-sm text-neutral-200 backdrop-blur-sm transition hover:bg-blue-500/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
