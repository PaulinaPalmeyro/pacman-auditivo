// src/views/TherapistViews/AssignActivities.jsx
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
  Checkbox,
  IconButton,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";

const mockPaciente = {
  nombre: "Lucía Fernández",
};

const mockData = [
  {
    nivel: 1,
    actividades: ["Discriminación de sonidos simples", "Repetición de secuencias cortas"]
  },
  {
    nivel: 2,
    actividades: ["Asociación de palabras con sonidos", "Secuencias de instrucciones"]
  },
  {
    nivel: 3,
    actividades: ["Comprensión en ambiente ruidoso", "Memoria auditiva extendida"]
  }
];

const AssignActivities = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/paciente/1");
  };

  const handleSave = () => {
    alert("Actividades asignadas (mock)");
    navigate("/paciente/1");
  };

  return (
    <Box>
      <TherapistNavbar username="Dra. Julieta Larrarte" />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
          Asignar Actividades
        </Typography>

        <Typography variant="subtitle1" textAlign="center" mb={4}>
          Paciente: {mockPaciente.nombre}
        </Typography>

        {mockData.map((nivel) => (
          <Paper key={nivel.nivel} elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight={600} color="#7B1FA2" gutterBottom>
              Nivel {nivel.nivel}
            </Typography>
            <List>
              {nivel.actividades.map((actividad, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={actividad} />
                    <ListItemSecondaryAction>
                      <Checkbox edge="end" color="primary" />
                      <IconButton edge="end" sx={{ ml: 1 }}>
                        <Edit color="action" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < nivel.actividades.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ))}

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCancel}
            sx={{ borderRadius: "999px", px: 10 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#7B1FA2",
              color: "white",
              fontWeight: 700,
              borderRadius: "999px",
              px: 11,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#6a1b9a",
              },
            }}
          >
            Guardar
          </Button>
        </Stack>
      </Container>

      <TherapistFooter />
    </Box>
  );
};

export default AssignActivities;
