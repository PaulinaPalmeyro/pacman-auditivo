import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Alert,
  Divider,
  Chip
} from "@mui/material";
import { ArrowBack, PlayArrow, Replay } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../../components/patients/PatientNavbar";
import PatientFooter from "../../components/patients/PatientFooter";
import authService from "../../services/authService";
import FondoFono from '../../assets/FondoFono.png';

const ActivityHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await authService.getHistorialActividadesPaciente();
        setHistorial(data.historial);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar el historial');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Función para navegar a la actividad según el tipo
  const handleComenzar = (asignacionId, ejercicioAsignadoId, actividad) => {
    const state = { from: 'historial' };
    // Normalizar el nombre de la actividad
    let tipoActividad = (actividad?.name || actividad?.gameName || actividad?.tipo || '').toLowerCase();
    switch (tipoActividad) {
      case 'detección auditiva':
      case 'deteccion auditiva':
        navigate(`/actividad-historial/deteccion-auditiva/${asignacionId}/${ejercicioAsignadoId}`, { state });
        break;
      case 'discriminación auditiva':
      case 'discriminacion auditiva':
        navigate(`/actividad-historial/discriminacion-auditiva/${asignacionId}/${ejercicioAsignadoId}`, { state });
        break;
      case 'integración auditiva':
      case 'integracion auditiva':
        navigate(`/actividad-historial/integracion-auditiva/${asignacionId}/${ejercicioAsignadoId}`, { state });
        break;
      case 'identificar cuál no pertenece':
      case 'identificar cual no pertenece':
        navigate(`/actividad-historial/identificar-no-pertenece/${asignacionId}/${ejercicioAsignadoId}`, { state });
        break;
      case 'completando la serie':
        navigate(`/actividad-historial/completando-serie/${asignacionId}/${ejercicioAsignadoId}`, { state });
        break;
      case 'imagen':
        navigate(`/actividad-historial/imagen/${asignacionId}/${ejercicioAsignadoId}`, { state });
        break;
      case 'imitacion':
        navigate(`/actividad-historial/imitacion/${asignacionId}/${ejercicioAsignadoId}`, { state });
        break;
      case 'historia':
        navigate(`/actividad-historial/historia/${asignacionId}/${ejercicioAsignadoId}`, { state });
        break;
      case 'problema':
        navigate(`/actividad-historial/problema/${asignacionId}/${ejercicioAsignadoId}`, { state });
        break;
      default:
        navigate(`/actividad-historial/deteccion-auditiva/${asignacionId}/${ejercicioAsignadoId}`, { state });
    }
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
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: `url(${FondoFono})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <PatientNavbar />
      <Container maxWidth="md" sx={{ py: 5, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton onClick={() => navigate("/paciente-dashboard")}> <ArrowBack sx={{ fontSize: 40 }} /> </IconButton>
          <Typography variant="h3" fontWeight={900} sx={{ ml: 2, color: '#7B1FA2', letterSpacing: 1 }}>
            Historial de Actividades
          </Typography>
        </Box>
        {historial.length === 0 ? (
          <Alert severity="info">No hay historial de actividades.</Alert>
        ) : (
          <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
            <List>
              {historial.map((asignacion, idx) => (
                <React.Fragment key={asignacion._id}>
                  <ListItem sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2, mb: 1 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="h5" color="#7B1FA2" fontWeight={900}>
                            Nivel {asignacion.nivel.number}
                          </Typography>
                          {asignacion.isActive ? (
                            <Chip label="Activo" color="primary" size="small" />
                          ) : (
                            <Chip label={asignacion.completo ? "Completado" : "Incompleto"} color={asignacion.completo ? "success" : "warning"} size="small" />
                          )}
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Asignado el {new Date(asignacion.fechaAsignacion).toLocaleDateString('es-AR', { timeZone: 'UTC' })}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {asignacion.actividades.map((actividad) => (
                    <React.Fragment key={actividad._id}>
                      <ListItem sx={{ pl: 4, py: 2 }}>
                        <ListItemText
                          primary={
                            <Typography variant="h5" color="#7B1FA2" fontWeight={900}>
                              {actividad.name}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {actividad.ejercicios.map((ejercicio, index) => {
                        const ejercicioAsignado = asignacion.ejercicios.find(
                          ej => ej.ejercicioId === ejercicio._id
                        );
                        return (
                          <React.Fragment key={ejercicio._id}>
                            <ListItem sx={{ pl: 8, py: 1 }}>
                              <ListItemText
                                primary={
                                  <Typography variant="h6" fontWeight={700}>
                                    Ejercicio {index + 1}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="body2" color="text.secondary">
                                    Estado: {ejercicioAsignado?.completo ? 'Completado' : 'Pendiente'}
                                  </Typography>
                                }
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  onClick={() => handleComenzar(asignacion._id, ejercicioAsignado?._id, actividad)}
                                  sx={{
                                    minWidth: 64,
                                    minHeight: 64,
                                    width: 64,
                                    height: 64,
                                    borderRadius: '50%',
                                    backgroundColor: ejercicioAsignado?.completo ? '#FF9800' : '#4caf50',
                                    color: 'white',
                                    boxShadow: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                      backgroundColor: ejercicioAsignado?.completo ? '#F57C00' : '#388e3c',
                                    },
                                  }}
                                  aria-label={ejercicioAsignado?.completo ? 'Reintentar' : 'Comenzar'}
                                >
                                  {ejercicioAsignado?.completo ? (
                                    <Replay sx={{ fontSize: 36 }} />
                                  ) : (
                                    <PlayArrow sx={{ fontSize: 36 }} />
                                  )}
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                            <Divider sx={{ my: 1, borderColor: '#e0e0e0', borderBottomWidth: 1 }} />
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  ))}
                  <Divider sx={{ my: 2, borderColor: '#7B1FA2', borderBottomWidth: 2 }} />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        )}
      </Container>
      <PatientFooter />
    </Box>
  );
};

export default ActivityHistory; 