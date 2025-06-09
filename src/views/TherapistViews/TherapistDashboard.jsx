import React from "react";
import { Box } from "@mui/material";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import PatientList from "../../components/therapists/PatientList";
import TherapistFooter from "../../components/therapists/TherapistFooter";
import FondoFono from '../../assets/FondoFono.png';

const TherapistDashboard = () => {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${FondoFono})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <TherapistNavbar username="Dra. Julieta Larrarte" />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <PatientList />
      </Box>
      <TherapistFooter />
    </Box>
  );
};

export default TherapistDashboard;