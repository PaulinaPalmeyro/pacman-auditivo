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
const preguntas = [
  {
    id: 1,
    audio: "/audios/perro.mp3",
    opciones: ["Gato", "Perro", "Caballo"],
    correcta: "Perro",
  },
  {
    id: 2,
    audio: "/audios/lluvia.mp3",
    opciones: ["Viento", "Lluvia", "Trueno"],
    correcta: "Lluvia",
  },
];

const AudioTextChoiceActivity = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [respondido, setRespondido] = useState(false);

  const actual = preguntas[index];

  const handleSeleccion = (opcion) => {
    setSeleccion(opcion);
    setRespondido(true);
  };

  const handleSiguiente = () => {
    if (index < preguntas.length - 1) {
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
            Elige la opción correcta
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <audio controls src={actual.audio} style={{ width: "100%" }}>
            Tu navegador no soporta el elemento de audio.
          </audio>

          <Typography variant="subtitle1" mt={3} mb={1}>
            ¿Qué escuchaste?
          </Typography>

          <Grid container spacing={2}>
            {actual.opciones.map((opcion) => {
              const esCorrecta = respondido && opcion === actual.correcta;
              const esIncorrecta = respondido && opcion === seleccion && opcion !== actual.correcta;
              return (
                <Grid item xs={12} sm={4} key={opcion}>
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

export default AudioTextChoiceActivity;
