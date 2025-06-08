// src/views/PatientViews/activities/AudioChoiceActivity.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../../../components/patients/PatientNavbar";
import PatientFooter from "../../../components/patients/PatientFooter";

const mockActividad = {
  nombre: "Discriminación de sonidos",
  audio: "/audios/sonido-perro.mp3", // Puedes reemplazarlo por un mock
  opciones: ["Gato", "Perro", "Vaca", "Pájaro"],
  correcta: "Perro",
};

const AudioChoiceActivity = () => {
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(null);
  const [resultado, setResultado] = useState(null);

  const reproducirAudio = () => {
    const audio = new Audio(mockActividad.audio);
    audio.play();
  };

  const manejarRespuesta = (opcion) => {
    setSeleccion(opcion);
    setResultado(opcion === mockActividad.correcta);
  };

  return (
    <Box>
      <PatientNavbar username="Lucía Fernández" />

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate("/actividades-asignadas")}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ flexGrow: 1 }}>
            {mockActividad.nombre}
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Escuchá el sonido y elegí la opción correcta:
          </Typography>

          <Box sx={{ textAlign: "center", mb: 3 }}>
            <IconButton onClick={reproducirAudio} sx={{ backgroundColor: "#F3E5F5" }}>
              <VolumeUp sx={{ fontSize: 40, color: "#7B1FA2" }} />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            {mockActividad.opciones.map((opcion) => (
              <Grid item xs={6} key={opcion}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => manejarRespuesta(opcion)}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor:
                      seleccion === opcion
                        ? resultado === null
                          ? "#E1BEE7"
                          : resultado
                          ? "#C8E6C9"
                          : "#FFCDD2"
                        : "white",
                  }}
                >
                  {opcion}
                </Button>
              </Grid>
            ))}
          </Grid>

          {resultado !== null && (
            <Typography
              variant="body1"
              fontWeight={600}
              mt={4}
              color={resultado ? "green" : "red"}
              textAlign="center"
            >
              {resultado ? "¡Correcto!" : "Respuesta incorrecta. Intenta de nuevo."}
            </Typography>
          )}
        </Paper>
      </Container>

      <PatientFooter />
    </Box>
  );
};

export default AudioChoiceActivity;
