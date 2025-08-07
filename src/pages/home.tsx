import React from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import TechnologySection from "@/components/technology-section";
import IndustriesSection from "@/components/industries-section";
import AdvancedCapabilities from "@/components/advanced-capabilities";
import ApproachSection from "@/components/approach-section";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <TechnologySection />
      <IndustriesSection />
      <AdvancedCapabilities />
      <ApproachSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
