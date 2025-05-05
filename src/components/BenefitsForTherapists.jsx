// src/components/BenefitsForTherapists.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import beneficiosImage from "../assets/BeneficiosFonoImg.png";

const benefits = [
  {
    icon: <PersonPinIcon sx={{ color: "#7B1FA2", fontSize: 36 }} />,
    title: "Tratamiento Personalizado",
    description:
      "Configura ejercicios específicos según las necesidades de cada paciente, ajustando la dificultad y el tipo de actividades.",
  },
  {
    icon: <InsertChartIcon sx={{ color: "#1976d2", fontSize: 36 }} />,
    title: "Análisis de Datos",
    description:
      "Estadísticas detalladas para evaluar el progreso, identificar patrones de error y ajustar el tratamiento de manera objetiva.",
  },
  {
    icon: <LibraryBooksIcon sx={{ color: "#4CAF50", fontSize: 36 }} />,
    title: "Recursos Digitales",
    description:
      "Acceso a una biblioteca de ejercicios auditivos organizados por niveles y habilidades, facilitando la planificación de las sesiones.",
  },
  {
    icon: <EmojiEmotionsIcon sx={{ color: "#FBC02D", fontSize: 36 }} />,
    title: "Motivación del Paciente",
    description:
      "El formato lúdico e interactivo aumenta el interés y la participación de los niños durante las sesiones terapéuticas.",
  },
];

const BenefitsForTherapists = () => {
  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Grid
        container
        spacing={6}
        alignItems="center"
        justifyContent="center"
        sx={{ maxWidth: "1400px", margin: "0 auto" }}
      >
        {/* Imagen a la izquierda */}
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src={beneficiosImage}
            alt="Fonoaudiólogo trabajando"
            sx={{
              width: "100%",
              maxWidth: 420,
              margin: "0 auto",
            }}
          />
        </Grid>

        {/* Lista de beneficios a la derecha */}
        <Grid item xs={12} md={6} sx={{ pl: { md: 6 } }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Beneficios para Fonoaudiólogos
          </Typography>
          <List>
            {benefits.map((benefit, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ py: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 50 }}>{benefit.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight={600}>
                      {benefit.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      {benefit.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BenefitsForTherapists;
