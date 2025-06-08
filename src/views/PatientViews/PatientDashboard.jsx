import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../../components/patients/PatientNavbar";
import PatientFooter from "../../components/patients/PatientFooter";
import Astronauta1 from "../../assets/AstronautaParaPatientDashboard1.png";
import Astronauta2 from "../../assets/AstronautaParaPatientDashboard2.png";

// Datos mockeados
const actividadesAsignadas = [
  { id: 1, nombre: "Actividad 1", resuelta: true },
  { id: 2, nombre: "Actividad 2", resuelta: false },
  { id: 3, nombre: "Actividad 3", resuelta: true },
  { id: 4, nombre: "Actividad 4", resuelta: false },
];

const PatientDashboard = () => {
  const navigate = useNavigate();

  const totalAsignadas = actividadesAsignadas.length;
  const totalResueltas = actividadesAsignadas.filter((a) => a.resuelta).length;

  return (
    <Box>
      <PatientNavbar username="Bruno" />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          wrap="nowrap" // evita que se bajen a la siguiente línea
        >
          {/* Imagen izquierda */}
          <Grid item lg={3} sx={{ textAlign: "center", flexShrink: 0 }}>
            <Box
              component="img"
              src={Astronauta1}
              alt="Astronauta izquierdo"
              sx={{
                width: "100%",
                maxWidth: 420,
                objectFit: "contain",
              }}
            />
          </Grid>

          {/* Contenido central */}
          <Grid item lg={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight={700} mb={4}>
                ¡Hola, Bruno!
              </Typography>

              <Stack spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "999px",
                    px: 6,
                    py: 2,
                    fontSize: "1.2rem",
                    textTransform: "none",
                    backgroundColor: "#7B1FA2",
                    "&:hover": {
                      backgroundColor: "#6a1b9a",
                    },
                  }}
                  onClick={() => navigate("/actividades-asignadas")}
                >
                  ¡Empezar! ({totalResueltas}/{totalAsignadas})
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate("/historial-actividades")}
                  sx={{ borderRadius: "999px", px: 6, py: 1.5 }}
                >
                  Ver historial de actividades
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Imagen derecha */}
          <Grid item lg={3} sx={{ textAlign: "center", flexShrink: 0 }}>
            <Box
              component="img"
              src={Astronauta2}
              alt="Astronauta derecho"
              sx={{
                width: "100%",
                maxWidth: 420,
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <PatientFooter />
    </Box>
  );
};

export default PatientDashboard;
