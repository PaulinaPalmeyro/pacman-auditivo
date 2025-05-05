// src/components/FeaturesSection.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import GamepadIcon from "@mui/icons-material/SportsEsports";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import TuneIcon from "@mui/icons-material/Tune";
import AssessmentIcon from "@mui/icons-material/Assessment";

const features = [
  {
    title: "Ejercicios Interactivos",
    description:
      "Actividades lúdicas diseñadas específicamente para mejorar las habilidades de procesamiento auditivo, organizadas por niveles progresivos.",
    icon: <GamepadIcon sx={{ fontSize: 40, color: "#7B1FA2" }} />,
  },
  {
    title: "Seguimiento de Progreso",
    description:
      "Estadísticas detalladas y reportes de avance para monitorear el desarrollo de cada paciente, incluyendo porcentajes de aciertos y patrones de error.",
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
  },
  {
    title: "Gestión de Pacientes",
    description:
      "Administración completa de perfiles, historial clínico y configuración personalizada de ejercicios para cada paciente.",
    icon: <PeopleIcon sx={{ fontSize: 40, color: "#009688" }} />,
  },
  {
    title: "Entorno Controlado",
    description:
      "Posibilidad de configurar ruido de fondo en los ejercicios para simular entornos reales y entrenar la comprensión auditiva en ambientes ruidosos.",
    icon: <VolumeUpIcon sx={{ fontSize: 40, color: "#F57C00" }} />,
  },
  {
    title: "Personalización",
    description:
      "El fonoaudiólogo puede configurar la dificultad, tipos de ejercicios y nivel de ruido de fondo según las necesidades específicas de cada paciente.",
    icon: <TuneIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
  },
  {
    title: "Informes y Análisis",
    description:
      "Generación de reportes detallados sobre el desempeño del paciente, facilitando la evaluación y ajuste del tratamiento.",
    icon: <AssessmentIcon sx={{ fontSize: 40, color: "#9C27B0" }} />,
  },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ padding: "4rem 2rem", backgroundColor: "#FAFAFA" }}>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        Características principales
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 2 }}>
        {features.map((feat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: "20px",
                textAlign: "center",
                height: "100%",
              }}
            >
              {feat.icon}
              <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
                {feat.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {feat.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
