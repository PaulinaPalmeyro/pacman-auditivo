// src/components/HowItWorksSection.jsx
import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import columnaIzquierda from "../assets/ColumnaIzquierdaLanding.png";
import columnaDerecha from "../assets/ColumnaDerechaLanding.png";

const steps = [
  {
    title: "Registro",
    description:
      "El fonoaudiólogo registra al paciente en el sistema, ingresando sus datos personales y clínicos.",
  },
  {
    title: "Configuración",
    description:
      "Se configura el nivel inicial y los ejercicios específicos según las necesidades del paciente.",
  },
  {
    title: "Sesión",
    description:
      "Durante la consulta, el paciente realiza los ejercicios bajo la supervisión del fonoaudiólogo.",
  },
  {
    title: "Análisis",
    description:
      "El sistema genera estadísticas automáticas sobre aciertos, errores y desempeño general.",
  },
  {
    title: "Avance",
    description:
      "El fonoaudiólogo revisa los resultados y habilita el siguiente nivel si lo considera adecuado.",
  },
];

const HowItWorksSection = () => {
  return (
    <Box sx={{ backgroundColor: "#F3F8FC", py: 6, position: "relative", overflow: "hidden" }}>
      {/* Imágenes decorativas */}
      <Box
        component="img"
        src={columnaIzquierda}
        alt="Decoración izquierda"
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          maxHeight: 600,
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        component="img"
        src={columnaDerecha}
        alt="Decoración derecha"
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          maxHeight: 600,
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Contenido principal */}
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          ¿Cómo funciona?
        </Typography>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}>
          {steps.map((step, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{
                padding: 3,
                borderRadius: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#E0ECF9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  color: "#1976d2",
                  fontSize: "1rem",
                  mb: 1,
                }}
              >
                {index + 1}
              </Box>
              <Typography variant="h6" fontWeight={600}>
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 1, maxWidth: "90%" }}
              >
                {step.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
