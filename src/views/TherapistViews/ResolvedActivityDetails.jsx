import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  IconButton,
  CircularProgress,
  Alert
} from "@mui/material";
import { ArrowBack, PlayArrow } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";
import authService from "../../services/authService";
import FondoFono from '../../assets/FondoFono.png';

const ResolvedActivityDetails = () => {
  const navigate = useNavigate();
  const { asignacionId, ejercicioAsignadoId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detalle, setDetalle] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        setLoading(true);
        const data = await authService.getEjercicioAsignadoDetalle(asignacionId, ejercicioAsignadoId);
        setDetalle(data);
        // Cargar audio si existe
        if (data.ejercicio.audioIds && data.ejercicio.audioIds.length > 0) {
          const audioUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/audio/${data.ejercicio.audioIds[0]}`;
          setAudio(new Audio(audioUrl));
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar el detalle');
        setLoading(false);
      }
    };
    fetchDetalle();
  }, [asignacionId, ejercicioAsignadoId]);

  const reproducirAudio = () => {
    if (audio) {
      audio.load();
      audio.currentTime = 0;
      audio.play().catch(e => {
        setError("Error al reproducir el audio.");
      });
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><CircularProgress /></Box>;
  }
  if (error) {
    return <Box sx={{ px: 4, py: 6 }}><Alert severity="error">{error}</Alert></Box>;
  }
  if (!detalle) {
    return <Box sx={{ px: 4, py: 6 }}><Alert severity="warning">No se encontró el detalle del ejercicio</Alert></Box>;
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: `url(${FondoFono})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <TherapistNavbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ flexGrow: 1 }}>
            Detalles del Ejercicio
          </Typography>
        </Box>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Actividad: {detalle.actividad.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Pregunta: {detalle.actividad.question}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Instrucciones: {detalle.ejercicio.instructions}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Opción correcta: <b>{detalle.ejercicio.correctAnswer}</b>
          </Typography>
          {/* Mostrar opciones posibles */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>Opciones posibles:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {detalle.ejercicio.options && detalle.ejercicio.options.length > 0 ? (
                detalle.ejercicio.options.map((op, idx) => (
                  <Box key={idx} sx={{ textAlign: 'center', minWidth: 120 }}>
                    {op.imageUrl && (
                      <img src={op.imageUrl} alt={op.text} style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 12, marginBottom: 8, background: '#f5f5f5' }} />
                    )}
                    <Typography variant="body2">{op.text}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No hay opciones registradas.</Typography>
              )}
            </Box>
          </Box>
          {detalle.ejercicio.audioIds && detalle.ejercicio.audioIds.length > 0 && (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={reproducirAudio}
              sx={{
                backgroundColor: "#7B1FA2",
                color: "white",
                fontWeight: 600,
                borderRadius: "999px",
                px: 4,
                textTransform: "none",
                mb: 2,
                mt: 3,
                "&:hover": { backgroundColor: "#6a1b9a" },
              }}
            >
              Escuchar Audio
            </Button>
          )}
          <Typography variant="subtitle2" gutterBottom>
            Estado: {detalle.completo ? 'Completado' : 'Pendiente'}
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Intentos del paciente
          </Typography>
          <List>
            {detalle.intentos.length === 0 && (
              <ListItem>
                <ListItemText primary="Sin intentos registrados" />
              </ListItem>
            )}
            {detalle.intentos.map((intento, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Intento ${index + 1}: ${intento.respuesta}`}
                    secondary={`Resultado: ${intento.correcto ? 'Correcto' : 'Incorrecto'} | Fecha: ${new Date(intento.fecha).toLocaleString()}`}
                  />
                </ListItem>
                {index < detalle.intentos.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
      <TherapistFooter />
    </Box>
  );
};

export default ResolvedActivityDetails; 