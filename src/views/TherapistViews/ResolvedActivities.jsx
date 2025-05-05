// src/views/TherapistViews/ResolvedActivities.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@mui/material";
import { Visibility, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";

const mockPaciente = {
  nombre: "Lucía Fernández",
};

const mockData = [
  {
    nivel: 1,
    actividades: [
      { nombre: "Discriminación de sonidos simples", progreso: 100 },
      { nombre: "Repetición de secuencias cortas", progreso: 80 },
    ]
  },
  {
    nivel: 2,
    actividades: [
      { nombre: "Asociación de palabras con sonidos", progreso: 60 },
      { nombre: "Secuencias de instrucciones", progreso: 90 },
    ]
  }
];

const ResolvedActivities = () => {
  const navigate = useNavigate();

  const calcularPromedio = (actividades) => {
    const total = actividades.reduce((acc, act) => acc + act.progreso, 0);
    return Math.round(total / actividades.length);
  };

  return (
    <Box>
      <TherapistNavbar username="Dra. Julieta Larrarte" />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate("/paciente/1")}> 
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ flexGrow: 1 }}>
            Actividades Resueltas
          </Typography>
        </Box>

        <Typography variant="subtitle1" textAlign="center" mb={4}>
          Paciente: {mockPaciente.nombre}
        </Typography>

        {mockData.map((nivel) => (
          <Paper key={nivel.nivel} elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight={600} color="#7B1FA2" gutterBottom>
              Nivel {nivel.nivel}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Progreso total del nivel: {calcularPromedio(nivel.actividades)}%
            </Typography>
            <List>
              {nivel.actividades.map((actividad, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={actividad.nombre} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => navigate("/actividad/1")}>
                        <Visibility />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < nivel.actividades.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ))}
      </Container>

      <TherapistFooter />
    </Box>
  );
};

export default ResolvedActivities;
