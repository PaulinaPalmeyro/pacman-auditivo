import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
} from "@mui/material";
import { ArrowBack, Replay } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../../components/patients/PatientNavbar";
import PatientFooter from "../../components/patients/PatientFooter";

// Mock de actividades resueltas
const actividadesResueltas = [
  { id: 1, nombre: "Discriminación de sonidos simples", tipo: "audio" },
  { id: 2, nombre: "Imitación de sonidos", tipo: "imitacion" },
  { id: 3, nombre: "Asociación de sonidos con imágenes", tipo: "imagen" },
  { id: 4, nombre: "Comprensión de historias cortas", tipo: "historia" },
];

const ActivityHistory = () => {
  const navigate = useNavigate();

  const handleVolverAJugar = (tipo) => {
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
        break;
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
            Historial de actividades
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
          <List>
            {actividadesResueltas.map((actividad) => (
              <ListItem key={actividad.id} divider>
                <ListItemText primary={actividad.nombre} />
                <ListItemSecondaryAction>
                  <Tooltip title="Jugar de vuelta">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() => handleVolverAJugar(actividad.tipo)}
                    >
                      <Replay />
                    </IconButton>
                  </Tooltip>
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

export default ActivityHistory;
