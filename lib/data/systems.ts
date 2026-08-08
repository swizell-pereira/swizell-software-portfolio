import type { ComponentType } from "react";
import BFFDiagram from "@/components/diagrams/BFFDiagram";
import RedisCacheDiagram from "@/components/diagrams/RedisCacheDiagram";
import RabbitMQDiagram from "@/components/diagrams/RabbitMQDiagram";
import AuthDiagram from "@/components/diagrams/AuthDiagram";
import EventDrivenDiagram from "@/components/diagrams/EventDrivenDiagram";
import MultiTenantDiagram from "@/components/diagrams/MultiTenantDiagram";

export type SystemTabId =
  | "bff"
  | "redis"
  | "rabbit"
  | "jwt"
  | "kafka"
  | "tenant";

export type SystemTab = {
  id: SystemTabId;
  label: string;
  shortLabel: string;
  description: string;
  Component: ComponentType;
};

export const systemTabs: SystemTab[] = [
  {
    id: "bff",
    label: "Backend for Frontend",
    shortLabel: "BFF",
    description:
      "Web BFF aggregates domain APIs; gateway validates JWT and routes; services publish async events.",
    Component: BFFDiagram,
  },
  {
    id: "redis",
    label: "Redis",
    shortLabel: "Redis",
    description:
      "Cache-aside pattern — HIT skips the database; MISS reads PostgreSQL and write-backs with TTL.",
    Component: RedisCacheDiagram,
  },
  {
    id: "rabbit",
    label: "RabbitMQ",
    shortLabel: "RabbitMQ",
    description:
      "Topic exchange routes domain events to bound queues — decoupled async consumers.",
    Component: RabbitMQDiagram,
  },
  {
    id: "jwt",
    label: "JWT",
    shortLabel: "JWT",
    description:
      "OAuth authorization code or credentials → Auth Service issues JWT → gateway validates on every request.",
    Component: AuthDiagram,
  },
  {
    id: "kafka",
    label: "Kafka",
    shortLabel: "Kafka",
    description:
      "Append-only event log with partitions — each consumer group reads independently at its own offset.",
    Component: EventDrivenDiagram,
  },
  {
    id: "tenant",
    label: "Multi Tenant SaaS",
    shortLabel: "Multi-tenant",
    description:
      "tenant_id from JWT → middleware sets DB context → schema-per-tenant isolation in PostgreSQL.",
    Component: MultiTenantDiagram,
  },
];
