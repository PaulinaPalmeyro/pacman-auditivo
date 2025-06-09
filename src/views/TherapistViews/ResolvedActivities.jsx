// src/views/TherapistViews/ResolvedActivities.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@mui/material";
import { Visibility, ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";
import FondoFono from '../../assets/FondoFono.png';
import authService from "../../services/authService";

const ResolvedActivities = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        setLoading(true);
        const data = await authService.getHistorialNiveles(id);
        setHistorial(data.historial);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar el historial');
        setLoading(false);
      }
    };
    fetchHistorial();
  }, [id]);

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: `url(${FondoFono})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <TherapistNavbar username="Dra. Julieta Larrarte" />
      <Container maxWidth="md" sx={{ py: 6, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate(`/fono-dashboard/paciente/${id}`)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ flexGrow: 1 }}>
            Historial de Ejercicios
          </Typography>
        </Box>
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : historial.length === 0 ? (
          <Typography>No hay historial de ejercicios para este paciente.</Typography>
        ) : (
          historial.map((nivel, idx) => (
            <Paper key={nivel.nivel._id || idx} elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
              <Typography variant="h6" fontWeight={600} color="#7B1FA2" gutterBottom>
                Nivel {nivel.nivel.number}
        </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {nivel.nivel.description}
            </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Fecha de asignación: {new Date(nivel.fechaAsignacion).toLocaleDateString('es-AR', { timeZone: 'UTC' })}
            </Typography>
              {nivel.actividades.map((actividad) => (
                <Box key={actividad._id} sx={{ mt: 2, mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>{actividad.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{actividad.description}</Typography>
            <List>
                    {actividad.ejercicios.map((ejercicio) => {
                      const ejercicioAsignado = nivel.ejercicios.find(ej => ej.ejercicioId === ejercicio._id || (ej.ejercicioId && ej.ejercicioId.toString() === ejercicio._id.toString()));
                      return (
                        <ListItem key={ejercicio._id} sx={{ pl: 2 }}
                          secondaryAction={
                            ejercicioAsignado && (
                              <IconButton
                                edge="end"
                                color="primary"
                                onClick={() => navigate(`/actividad/${nivel._id}/ejercicio-asignado/${ejercicioAsignado._id}`)}
                              >
                        <Visibility />
                      </IconButton>
                            )
                          }
                        >
                          <ListItemText
                            primary={ejercicio.name}
                            secondary={
                              ejercicioAsignado ?
                                `Completado: ${ejercicioAsignado.completo ? 'Sí' : 'No'} | Intentos: ${ejercicioAsignado.intentos.length}`
                                : 'No asignado'
                            }
                          />
                  </ListItem>
                      );
                    })}
            </List>
                </Box>
              ))}
          </Paper>
          ))
        )}
      </Container>
      <TherapistFooter />
    </Box>
  );
};

export default ResolvedActivities;
