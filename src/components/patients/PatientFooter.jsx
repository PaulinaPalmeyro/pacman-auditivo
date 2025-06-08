
// src/components/patients/PatientFooter.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const PatientFooter = () => {
  return (
    <Box sx={{ backgroundColor: "#7B1FA2", color: "white", py: 2, mt: 6, textAlign: "center" }}>
      <Typography variant="body2">&copy; 2025 PACman Auditivo. Todos los derechos reservados.</Typography>
    </Box>
  );
};

export default PatientFooter;
