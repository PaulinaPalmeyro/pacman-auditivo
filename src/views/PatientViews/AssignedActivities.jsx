import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { ArrowBack, PlayArrow } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../../components/patients/PatientNavbar";
import PatientFooter from "../../components/patients/PatientFooter";

// Ahora cada actividad tiene un tipo para redirigir a la vista correspondiente
const actividadesMock = [
  { id: 1, nombre: "Discriminación de sonidos simples", nivel: 1, tipo: "audio" },
  { id: 2, nombre: "Imitación de sonidos", nivel: 1, tipo: "imitacion" },
  { id: 3, nombre: "Asociación de sonidos con imágenes", nivel: 1, tipo: "imagen" },
  { id: 4, nombre: "Comprensión de historias cortas", nivel: 3, tipo: "historia" },
];

const AssignedActivities = () => {
  const navigate = useNavigate();

  const handleComenzar = (id, tipo) => {
    switch (tipo) {
      case "audio":
        navigate("/actividad/audio");
        break;
      case "imagen":
        navigate("/actividad/imagen");
        break;
      case "imitacion":
        navigate("/actividad/imitacion");
        break;
      case "historia":
        navigate("/actividad/historia");
        break;
      default:
        navigate("/actividad-iniciar/" + id);
    }
  };

  return (
    <Box>
      <PatientNavbar username="Bruno" />

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate("/paciente-dashboard")}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            sx={{ flexGrow: 1 }}
          >
            Actividades asignadas
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
          <List>
            {actividadesMock.map((actividad) => (
              <ListItem key={actividad.id} divider>
                <ListItemText
                  primary={actividad.nombre}
                  secondary={`Nivel ${actividad.nivel}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrow />}
                    onClick={() => handleComenzar(actividad.id, actividad.tipo)}
                    sx={{ textTransform: "none", borderRadius: "999px" }}
                  >
                    Comenzar
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>

      <PatientFooter />
    </Box>
  );
};

export default AssignedActivities;
