// src/components/therapists/TherapistsFeatures.jsx
import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import PeopleIcon from "@mui/icons-material/Groups";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
    <Box sx={{ py: 8, backgroundColor: "#f9fbfd" }}>
      <Container>
        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
          Funcionalidades para Fonoaudiólogos
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          mb={4}
        >
          PACman Auditivo ofrece un conjunto completo de herramientas diseñadas específicamente para profesionales.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {funcionalidades.map((func, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "left",
                  backgroundColor: "#f7fafd",
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Box>{func.icon}</Box>
                <Typography variant="subtitle1" fontWeight={600} mt={1}>
                  {func.titulo}
                </Typography>
                <Typography variant="body2" color="textSecondary">
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
