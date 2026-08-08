import type { Metadata } from "next";
import SystemsContent from "@/components/SystemsContent";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Systems — ${SITE_NAME}`,
  description:
    "Interactive architecture diagrams — BFF, Redis, RabbitMQ, JWT, Kafka, and multi-tenant SaaS patterns.",
};

export default function SystemsPage() {
  return (
    <main className="min-h-0 pt-16">
      <SystemsContent />
    </main>
  );
}
