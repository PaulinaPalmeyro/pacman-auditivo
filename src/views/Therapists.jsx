// src/views/Therapists.jsx
import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TherapistsHeader from "../components/therapists/TherapistsHeader";
import TherapistsCards from "../components/therapists/TherapistsCards";
import TherapistsFeatures from "../components/therapists/TherapistsFeatures";

const Therapists = () => {
  return (
    <Box>
      <Navbar />
      <TherapistsHeader />
      <TherapistsCards />
      <TherapistsFeatures />
      <Footer />
    </Box>
  );
};

export default Therapists;
