import React from "react";
import { Box } from "@mui/material";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import PatientList from "../../components/therapists/PatientList";
import TherapistFooter from "../../components/therapists/TherapistFooter";

const TherapistDashboard = () => {
  return (
    <Box>
      <TherapistNavbar username="Dra. Julieta Larrarte" />
      <PatientList />
      <TherapistFooter />
    </Box>
  );
};

export default TherapistDashboard;