
// src/components/therapist/TherapistFooter.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const TherapistFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 3,
        px: 2,
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e0e0e0",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} PACman Auditivo — Sección Fonoaudiólogos
      </Typography>
    </Box>
  );
};

export default TherapistFooter;
