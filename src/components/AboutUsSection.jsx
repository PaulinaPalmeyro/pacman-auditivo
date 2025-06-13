// src/components/AboutUsSection.jsx
import React from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.png";
import avatar6 from "../assets/avatar6.png";

// Personas de desarrollo
const developmentTeam = [
  {
    name: "Paulina Palmeyro",
    description: "Estudiante de Ingeniería en Sistemas, ncargada del frontend.",
    image: avatar1,
  },
  {
    name: "Stiven monsalvo",
    description: "Estudiante de Ingeniería en Sistemas, encargado del testing.",
    image: avatar2,
  },
  {
    name: "Lautaro Vega",
    description: "Estudiante de Ingeniería en Sistemas, encargado del backend.",
    image: avatar3,
  },
];

// Personas de fonoaudiología
const fonoTeam = [
  {
    name: "Oriana Ávalos",
    description: "Estudiante de Fonoaudiología, aporta el enfoque clínico y terapéutico al proyecto.",
    image: avatar4,
  },
  {
    name: "Valentina López",
    description: "Estudiante de Fonoaudiología, especializada en desarrollo de actividades auditivas.",
    image: avatar5,
  },
  {
    name: "Julieta Ríos",
    description: "Estudiante de Fonoaudiología, se enfoca en la validación clínica del contenido.",
    image: avatar6,
  },
];

const renderTeam = (title, team) => (
  <>
    <Typography variant="h5" fontWeight={700} textAlign="center" mt={6} mb={3}>
      {title}
    </Typography>
    <Grid container spacing={6} justifyContent="center">
      {team.map((person, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar
              src={person.image}
              alt={person.name}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Typography variant="h6" fontWeight={600}>
              {person.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {person.description}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </>
);

const AboutUsSection = () => {
  return (
    <Box sx={{ py: 10, px: 4, backgroundColor: "#fdf6ff" }}>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          Sobre Nosotros
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          maxWidth={800}
          mx="auto"
          mb={6}
        >
          Somos un equipo interdisciplinario de estudiantes que unimos nuestras habilidades en programación, diseño y fonoaudiología para crear una herramienta que apoye el tratamiento del Procesamiento Auditivo Central en niños.
        </Typography>

        {renderTeam("Equipo de Desarrollo", developmentTeam)}
        {renderTeam("Equipo de Fonoaudiología", fonoTeam)}
      </Box>
    </Box>
  );
};

export default AboutUsSection;
