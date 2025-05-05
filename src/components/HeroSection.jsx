// src/components/HeroSection.jsx
import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import ilustracion from "../assets/IlustracionLanding.png";

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #F3F6FD, #ffffff)",
        padding: "4rem 2rem",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Texto */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
            PACman Auditivo
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Software interactivo especializado para el entrenamiento de habilidades de
            Procesamiento Auditivo Central (PAC) en niños de 6 a 12 años con DPAC.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" endIcon={"→"}>
              Comenzar ahora
            </Button>
            <Button variant="outlined">Conocer más</Button>
          </Box>
        </Grid>

        {/* Imagen */}
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src={ilustracion}
            alt="Ilustración principal"
            sx={{ width: "100%", maxWidth: 700 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
