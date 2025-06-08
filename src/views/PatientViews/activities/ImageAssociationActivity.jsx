// src/views/PatientViews/activities/ImageAssociationActivity.jsx
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
  nombre: "Asociación de sonidos con imágenes",
  audio: "/audios/donde-esta-gato.mp3", // Solo simulado
  opciones: [
    { id: 1, texto: "Perro", imagen: "/imagenes/perro.jpg" },
    { id: 2, texto: "Gato", imagen: "/imagenes/gato.jpg" },
    { id: 3, texto: "Vaca", imagen: "/imagenes/vaca.jpg" },
    { id: 4, texto: "Caballo", imagen: "/imagenes/caballo.jpg" },
  ],
  correctaId: 2,
};

const ImageAssociationActivity = () => {
  const navigate = useNavigate();
  const [seleccionId, setSeleccionId] = useState(null);
  const [resultado, setResultado] = useState(null);

  const reproducirAudio = () => {
    const audio = new Audio(mockActividad.audio);
    audio.play();
  };

  const manejarRespuesta = (id) => {
    setSeleccionId(id);
    setResultado(id === mockActividad.correctaId);
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
            Escuchá y elegí la imagen correspondiente:
          </Typography>

          <Box sx={{ textAlign: "center", mb: 3 }}>
            <IconButton onClick={reproducirAudio} sx={{ backgroundColor: "#F3E5F5" }}>
              <VolumeUp sx={{ fontSize: 40, color: "#7B1FA2" }} />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            {mockActividad.opciones.map((opcion) => (
              <Grid item xs={6} key={opcion.id}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => manejarRespuesta(opcion.id)}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    height: 100,
                    backgroundColor:
                      seleccionId === opcion.id
                        ? resultado === null
                          ? "#E1BEE7"
                          : resultado
                          ? "#C8E6C9"
                          : "#FFCDD2"
                        : "white",
                  }}
                >
                  {/* Por ahora mostramos el texto, luego se puede usar <img src={opcion.imagen} /> */}
                  {opcion.texto}
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

export default ImageAssociationActivity;
