import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../../../components/patients/PatientNavbar";
import PatientFooter from "../../../components/patients/PatientFooter";

// Datos mockeados
const situaciones = [
  {
    id: 1,
    audio: "/audios/situacion1.mp3",
    pregunta: "Estás en la escuela y olvidaste tu tarea. ¿Qué deberías hacer?",
    opciones: [
      "Decir que tu perro se la comió",
      "Pedir disculpas y prometer entregarla mañana",
      "Ignorar al profesor",
    ],
    correcta: "Pedir disculpas y prometer entregarla mañana",
  },
  {
    id: 2,
    audio: "/audios/situacion2.mp3",
    pregunta: "Tu amigo se cae y se lastima la rodilla. ¿Qué hacés?",
    opciones: [
      "Te reís",
      "Seguís caminando como si nada",
      "Lo ayudás a levantarse y avisás a un adulto",
    ],
    correcta: "Lo ayudás a levantarse y avisás a un adulto",
  },
];

const ProblemSolvingActivity = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [respondido, setRespondido] = useState(false);

  const actual = situaciones[index];

  const handleSeleccion = (opcion) => {
    setSeleccion(opcion);
    setRespondido(true);
  };

  const handleSiguiente = () => {
    if (index < situaciones.length - 1) {
      setIndex(index + 1);
      setSeleccion(null);
      setRespondido(false);
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
            Resolvé la situación
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <audio controls src={actual.audio} style={{ width: "100%" }}>
            Tu navegador no soporta el elemento de audio.
          </audio>

          <Typography variant="subtitle1" mt={3} mb={2}>
            {actual.pregunta}
          </Typography>

          <Grid container spacing={2}>
            {actual.opciones.map((opcion) => {
              const esCorrecta = respondido && opcion === actual.correcta;
              const esIncorrecta = respondido && opcion === seleccion && opcion !== actual.correcta;

              return (
                <Grid item xs={12} key={opcion}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleSeleccion(opcion)}
                    disabled={respondido}
                    sx={{
                      borderRadius: 3,
                      backgroundColor: esCorrecta
                        ? "#C8E6C9"
                        : esIncorrecta
                        ? "#FFCDD2"
                        : "inherit",
                    }}
                  >
                    {opcion}
                  </Button>
                </Grid>
              );
            })}
          </Grid>

          {respondido && (
            <Box mt={4}>
              <Divider sx={{ mb: 2 }} />
              <Button
                variant="contained"
                onClick={handleSiguiente}
                sx={{ borderRadius: "999px", textTransform: "none" }}
              >
                Siguiente
              </Button>
            </Box>
          )}
        </Paper>
      </Container>

      <PatientFooter />
    </Box>
  );
};

export default ProblemSolvingActivity;
