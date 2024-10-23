"use client";

import { useState } from "react";

import BenefitsSection from "./components/benefits";
import CTASection from "./components/cta";
import FeaturesSection from "./components/features";
import HeroSection from "./components/hero";
import Navbar from "./components/navbar";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <main className="flex h-screen flex-col justify-between">
      <Navbar />
      <HeroSection onComplete={() => setShowContent(true)} />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
    </main>
  );
}
