import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../../../components/patients/PatientNavbar";
import PatientFooter from "../../../components/patients/PatientFooter";

// Mock de sonidos a imitar
const sonidos = [
  { id: 1, descripcion: "Imitá el sonido de una vaca", audio: "/audios/vaca.mp3" },
  { id: 2, descripcion: "Imitá el sonido de una ambulancia", audio: "/audios/ambulancia.mp3" },
  { id: 3, descripcion: "Imitá el sonido de una campana", audio: "/audios/campana.mp3" },
];

const VoiceImitationActivity = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const sonidoActual = sonidos[index];

  const handleNext = () => {
    if (index < sonidos.length - 1) {
      setIndex(index + 1);
    } else {
      alert("¡Actividad completada!");
      navigate("/paciente-dashboard");
    }
  };

  return (
    <Box>
      <PatientNavbar username="Bruno" />

      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            sx={{ flexGrow: 1 }}
          >
            Imitación de sonidos
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            {sonidoActual.descripcion}
          </Typography>

          <audio controls src={sonidoActual.audio} style={{ width: "100%", marginBottom: "2rem" }}>
            Tu navegador no soporta el elemento de audio.
          </audio>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ textTransform: "none", borderRadius: 99 }}
          >
            Siguiente
          </Button>
        </Paper>
      </Container>

      <PatientFooter />
    </Box>
  );
};

export default VoiceImitationActivity;
