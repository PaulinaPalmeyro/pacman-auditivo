import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
  Fade
} from "@mui/material";
import { ArrowBack, VolumeUp, EmojiEmotions, SentimentDissatisfied } from "@mui/icons-material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PatientNavbar from "../../../components/patients/PatientNavbar";
import PatientFooter from "../../../components/patients/PatientFooter";
import authService from "../../../services/authService";

const CompletandoSerieActivity = ({ historialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ejercicio, setEjercicio] = useState(null);
  const [audio, setAudio] = useState(null);
  const [seleccion, setSeleccion] = useState(null);
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
    if (audio) {
      audio.load();
      audio.currentTime = 0;
      audio.play().catch(() => setError("Error al reproducir el audio."));
    } else {
      setError("No hay audio disponible para este ejercicio.");
    }
  };

  const handleSeleccion = (opcion) => {
    setSeleccion(opcion);
  };

  const handleConfirmar = async () => {
    if (seleccion === null) return;
    try {
      const esCorrecto = seleccion === ejercicio.correctAnswer;
      await authService.registrarIntento(params.id, {
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
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton onClick={handleContinuar}> <ArrowBack /> </IconButton>
          <Typography variant="h5" fontWeight={700} sx={{ ml: 2 }}>
            Completando la serie
          </Typography>
        </Box>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            {ejercicio?.question || 'Escucha el audio y elige la opción que completa la serie'}
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
                '&:hover': { backgroundColor: '#6a1b9a' },
              }}
            >
              <VolumeUp sx={{ fontSize: 90 }} />
            </Button>
          </Box>
          <Grid container spacing={1} direction="row" sx={{ mt: 1, justifyContent: 'center', flexWrap: 'nowrap' }}>
            {ejercicio?.options?.map((opcion, idx) => (
              <Grid item xs={4} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  fullWidth
                  variant={seleccion === opcion.text ? 'contained' : 'outlined'}
                  onClick={() => handleSeleccion(opcion.text)}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    height: 200,
                    backgroundColor: seleccion === opcion.text ? '#E1BEE7' : 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img src={opcion.imageUrl} alt={opcion.text} style={{ maxHeight: 170, marginBottom: 0 }} />
                </Button>
              </Grid>
            ))}
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
      <Dialog open={showResult} maxWidth="sm" fullWidth>
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
              '&:hover': { backgroundColor: '#6a1b9a' },
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

export default CompletandoSerieActivity; 