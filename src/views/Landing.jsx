// src/views/Landing.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import BenefitsForTherapists from "../components/BenefitsForTherapists";
import Footer from "../components/Footer";
const Landing = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsForTherapists />
      <Footer />
    </>
  );
};

export default Landing;
