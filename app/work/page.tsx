import type { Metadata } from "next";
import WorkIndex from "@/components/WorkIndex";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Work — ${SITE_NAME}`,
  description:
    "Selected engineering work — FinTech, SaaS, and enterprise platforms with architecture-first case studies.",
};

export default function WorkPage() {
  return <WorkIndex />;
}
