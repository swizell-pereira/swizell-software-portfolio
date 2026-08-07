"use client";

import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BFFDiagram from "@/components/diagrams/BFFDiagram";
import MultiTenantDiagram from "@/components/diagrams/MultiTenantDiagram";
import RedisCacheDiagram from "@/components/diagrams/RedisCacheDiagram";
import AuthDiagram from "@/components/diagrams/AuthDiagram";
import RabbitMQDiagram from "@/components/diagrams/RabbitMQDiagram";
import EventDrivenDiagram from "@/components/diagrams/EventDrivenDiagram";

type DiagramId =
  | "bff"
  | "tenant"
  | "redis"
  | "jwt"
  | "rabbit"
  | "event";

const items: {
  id: DiagramId;
  label: string;
  description: string;
  Component: ComponentType;
}[] = [
  {
    id: "bff",
    label: "Backend For Frontend",
    description: "Gateway, OAuth 2.0, JWT, RBAC, and service orchestration.",
    Component: BFFDiagram,
  },
  {
    id: "tenant",
    label: "Multi Tenant SaaS",
    description: "Tenant context middleware with schema isolation.",
    Component: MultiTenantDiagram,
  },
  {
    id: "redis",
    label: "Redis Cache",
    description: "Cache hit vs miss with TTL write-back.",
    Component: RedisCacheDiagram,
  },
  {
    id: "jwt",
    label: "Authentication",
    description: "JWT issuance and OAuth 2.0 — two paths, one protected API.",
    Component: AuthDiagram,
  },
  {
    id: "rabbit",
    label: "RabbitMQ",
    description: "Exchange routing and fan-out to consumers.",
    Component: RabbitMQDiagram,
  },
  {
    id: "event",
    label: "Event Driven",
    description: "Kafka topics lighting up downstream.",
    Component: EventDrivenDiagram,
  },
];

export default function DiagramContainer() {
  const [active, setActive] = useState<DiagramId>("bff");
  const current = items.find((item) => item.id === active)!;

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] shadow-[0_0_80px_rgba(37,99,235,0.08)] backdrop-blur-xl">
      <div className="grid lg:grid-cols-[280px_1fr]">
        {/* Left nav — Linear / Stripe docs style */}
        <nav className="border-b border-white/10 lg:border-r lg:border-b-0">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="text-[11px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
              System Design
            </p>
            <p className="mt-1 text-sm text-neutral-400">
              Interactive architecture
            </p>
          </div>

          <ul className="flex gap-1 overflow-x-auto p-3 lg:block lg:space-y-1 lg:overflow-visible">
            {items.map((item) => {
              const selected = item.id === active;
              return (
                <li key={item.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "w-full rounded-xl px-3.5 py-3 text-left transition-all duration-300",
                      selected
                        ? "bg-blue-500/15 text-white shadow-[inset_0_0_0_1px_rgba(96,165,250,0.35)]"
                        : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200"
                    )}
                  >
                    <span className="block text-sm font-medium whitespace-nowrap lg:whitespace-normal">
                      {item.label}
                    </span>
                    <span className="mt-0.5 hidden text-xs leading-5 text-neutral-500 lg:block">
                      {item.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right panel */}
        <div className="min-h-[480px] p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {current.label}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {current.description}
                </p>
              </div>
              <current.Component />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
