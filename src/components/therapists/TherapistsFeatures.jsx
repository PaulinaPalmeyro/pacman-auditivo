// src/components/therapists/TherapistsFeatures.jsx
import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import PeopleIcon from "@mui/icons-material/Groups";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@mui/system";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const funcionalidades = [
  {
    icon: <PeopleIcon fontSize="large" sx={{ color: "#5C6BC0" }} />,
    titulo: "Gestión de Pacientes",
    descripcion:
      "Registra, edita y organiza la información de tus pacientes en un solo lugar.",
  },
  {
    icon: <LibraryBooksIcon fontSize="large" sx={{ color: "#26A69A" }} />,
    titulo: "Biblioteca de Ejercicios",
    descripcion:
      "Accede a una amplia variedad de ejercicios auditivos organizados por niveles y habilidades.",
  },
  {
    icon: <CheckCircleIcon fontSize="large" sx={{ color: "#9CCC65" }} />,
    titulo: "Seguimiento de Progreso",
    descripcion:
      "Visualiza estadísticas detalladas y reportes de avance para cada paciente.",
  },
];

const TherapistsFeatures = () => {
  return (
    <Box sx={{ py: 12, backgroundColor: "#f9fbfd" }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
          sx={{
            mb: 2,
            background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Funcionalidades para Fonoaudiólogos
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          mb={6}
          sx={{ maxWidth: "800px", margin: "0 auto" }}
        >
          PACman Auditivo ofrece un conjunto completo de herramientas diseñadas específicamente para profesionales.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {funcionalidades.map((func, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "left",
                  backgroundColor: "#ffffff",
                  borderRadius: 4,
                  height: "100%",
                  transition: "all 0.3s ease",
                  animation: `${fadeInUp} 0.5s ease-out ${index * 0.2}s both`,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "rgba(92, 107, 192, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  {func.icon}
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ mb: 2, color: "#2c3e50" }}
                >
                  {func.titulo}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {func.descripcion}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TherapistsFeatures;
