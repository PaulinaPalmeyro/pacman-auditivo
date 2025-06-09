import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Grid,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
  Zoom,
  Fade,
} from "@mui/material";
import { ArrowBack, VolumeUp, Check, Close, EmojiEmotions, SentimentDissatisfied } from "@mui/icons-material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PatientNavbar from "../../../components/patients/PatientNavbar";
import PatientFooter from "../../../components/patients/PatientFooter";
import authService from "../../../services/authService";

const AudioDiscriminationActivity = ({ historialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ejercicio, setEjercicio] = useState(null);
  const [seleccion, setSeleccion] = useState(null);
  const [audio, setAudio] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const fetchEjercicio = async () => {
      try {
        setLoading(true);
        let data;
        if (params.asignacionId && params.ejercicioAsignadoId) {
          // Modo historial
          const res = await authService.getEjercicioAsignadoDetalle(params.asignacionId, params.ejercicioAsignadoId);
          data = { ...res.ejercicio, ...res.actividad, completo: res.completo, intentos: res.intentos };
        } else {
          // Modo normal
          data = await authService.getEjercicioById(params.id);
        }
        setEjercicio(data);
        if (data.audioIds && data.audioIds.length > 0) {
          const audioUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/audio/${data.audioIds[0]}`;
          setAudio(new Audio(audioUrl));
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar el ejercicio');
        setLoading(false);
      }
    };
    fetchEjercicio();
  }, [params]);

  const reproducirAudio = () => {
    console.log("Current audio object state:", audio);
    if (audio) {
      audio.load();
      audio.currentTime = 0;
      audio.play().catch(e => {
        console.error("Error playing audio:", e);
        setError("Error al reproducir el audio. Puede que el formato no sea compatible o el archivo esté dañado.");
      });
    } else {
      console.error("Audio object is null or undefined.");
      setError("No hay audio disponible para este ejercicio.");
    }
  };

  const handleSeleccion = (opcion) => {
    setSeleccion(opcion);
  };

  const handleConfirmar = async () => {
    if (seleccion === null) return;

    try {
      console.log('Selección del usuario:', seleccion);
      console.log('Respuesta correcta del backend (original):', ejercicio.correctAnswer);
      
      let backendCorrectAnswerMapped;
      if (ejercicio.correctAnswer === '0') {
        backendCorrectAnswerMapped = 'Iguales';
      } else if (ejercicio.correctAnswer === '1') {
        backendCorrectAnswerMapped = 'Diferentes';
      } else {
        // Si correctAnswer ya es un string como 'Iguales' o 'Diferentes', o es un valor inesperado
        backendCorrectAnswerMapped = ejercicio.correctAnswer;
      }

      console.log('Respuesta correcta del backend (mapeada):', backendCorrectAnswerMapped);
      
      const esCorrecto = seleccion === backendCorrectAnswerMapped;
      console.log('¿Es correcto?:', esCorrecto);

      const response = await authService.registrarIntento(params.id, {
        respuesta: seleccion,
        correcto: esCorrecto
      });
      setResultado(esCorrecto);
      setShowResult(true);
    } catch (err) {
      setError(err.message || 'Error al registrar la respuesta');
    }
  };

  const handleContinuar = () => {
    if (location.state?.from === 'historial') {
      navigate('/historial-actividades');
    } else {
      navigate('/actividades-asignadas');
    }
  };

  const handleReintentar = () => {
    setShowResult(false);
    setSeleccion(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 4, py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <PatientNavbar />

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton onClick={handleContinuar}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight={700} sx={{ ml: 2 }}>
            {ejercicio?.gameName || 'Discriminación Auditiva'}
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            {ejercicio?.question || '¿Los sonidos son iguales o diferentes?'}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={reproducirAudio}
              sx={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                backgroundColor: '#7B1FA2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#6a1b9a',
                },
              }}
            >
              <VolumeUp sx={{ fontSize: 90 }} />
            </Button>
          </Box>

          <Grid container spacing={4} sx={{ mt: 4, mb: 2, justifyContent: 'center' }}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() => handleSeleccion('Iguales')}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: seleccion === 'Iguales' ? '#4caf50' : '#c8e6c9',
                  color: seleccion === 'Iguales' ? 'white' : '#388e3c',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: seleccion === 'Iguales' ? 6 : 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: '#66bb6a',
                    color: 'white',
                  },
                }}
              >
                <Check sx={{ fontSize: 48 }} />
                <Typography sx={{ mt: 1, fontWeight: 600, fontSize: '1rem' }}>Iguales</Typography>
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() => handleSeleccion('Diferentes')}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: seleccion === 'Diferentes' ? '#f44336' : '#ffcdd2',
                  color: seleccion === 'Diferentes' ? 'white' : '#f44336',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: seleccion === 'Diferentes' ? 6 : 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: '#e57373',
                    color: 'white',
                  },
                }}
              >
                <Close sx={{ fontSize: 48 }} />
                <Typography sx={{ mt: 1, fontWeight: 600, fontSize: '1rem' }}>Diferentes</Typography>
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmar}
              disabled={seleccion === null}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: '999px',
              }}
            >
              Confirmar
            </Button>
          </Box>
        </Paper>
      </Container>

      <Dialog
        open={showResult}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Zoom}
        transitionDuration={500}
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <Fade in={showResult} timeout={1000}>
            <Box>
              {resultado ? (
                <>
                  <EmojiEmotions sx={{ fontSize: 100, color: '#4caf50', mb: 2 }} />
                  <Typography variant="h4" color="success.main" gutterBottom>
                    ¡Excelente! 🎉
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ¡Lo hiciste muy bien! 🌟
                  </Typography>
                </>
              ) : (
                <>
                  <SentimentDissatisfied sx={{ fontSize: 100, color: '#f44336', mb: 2 }} />
                  <Typography variant="h4" color="error" gutterBottom>
                    ¡Ups! 😅
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ¡No te preocupes! Puedes intentarlo de nuevo 💪
                  </Typography>
                </>
              )}
            </Box>
          </Fade>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
          <Button
            variant="outlined"
            onClick={handleReintentar}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: '999px',
              mr: 2,
            }}
          >
            Reintentar
          </Button>
          <Button
            variant="contained"
            onClick={handleContinuar}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: '999px',
              backgroundColor: '#7B1FA2',
              '&:hover': {
                backgroundColor: '#6a1b9a',
              },
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

      <PatientFooter />
    </Box>
  );
};

export default AudioDiscriminationActivity; 