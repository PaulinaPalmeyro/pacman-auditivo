// src/components/therapists/TherapistsHeader.jsx
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const TherapistsHeader = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: "#f3f8fc" }}>
      <Container>
        <Typography variant="h3" align="center" fontWeight={700}>
          Área de Fonoaudiólogos
        </Typography>
      </Container>
    </Box>
  );
};

export default TherapistsHeader;
