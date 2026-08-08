import type { Metadata } from "next";
import AboutIntro from "@/components/AboutIntro";
import PromotionJourney from "@/components/journey/PromotionJourney";
import EngineeringPrinciples from "@/components/EngineeringPrinciples";
import Leadership from "@/components/Leadership";
import ResumeSection from "@/components/ResumeSection";
import TechnologyEcosystem from "@/components/TechnologyEcosystem";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description:
    "Experience, technology ecosystem, engineering philosophy, and leadership — Senior Full Stack Engineer in Bangalore.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutIntro />
      <PromotionJourney />
      <TechnologyEcosystem />
      <EngineeringPrinciples />
      <Leadership />
      <ResumeSection />
    </main>
  );
}
