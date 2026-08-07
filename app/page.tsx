import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoIAm from "@/components/WhoIAm";
import SelectedWork from "@/components/SelectedWork";
import EngineeringPrinciples from "@/components/EngineeringPrinciples";
import TechnologyEcosystem from "@/components/TechnologyEcosystem";
import CareerJourney from "@/components/CareerJourney";
import Recognition from "@/components/Recognition";
import SystemDesignPlayground from "@/components/SystemDesignPlayground";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhoIAm />
        <SelectedWork />
        <EngineeringPrinciples />
        <TechnologyEcosystem />
        <CareerJourney />
        <Recognition />
        <SystemDesignPlayground />
        <Contact />
      </main>
    </>
  );
}
