import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { ArrowBack, PlayArrow, EmojiEvents, Replay } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../../components/patients/PatientNavbar";
import PatientFooter from "../../components/patients/PatientFooter";
import authService from "../../services/authService";
import FondoFono from '../../assets/FondoFono.png';

const AssignedActivities = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [asignacion, setAsignacion] = useState(null);
  const [showCompletedDialog, setShowCompletedDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const asignacionData = await authService.getMisActividades();
        if (asignacionData.asignacion) {
          setAsignacion(asignacionData.asignacion);
          if (asignacionData.asignacion.completo) {
            setShowCompletedDialog(true);
          }
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar las actividades');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleComenzar = (ejercicio, tipoActividad) => {
    switch (tipoActividad?.toLowerCase()) {
      case 'detección auditiva':
      case 'deteccion auditiva':
        navigate(`/actividad/deteccion-auditiva/${ejercicio._id}`);
        break;
      case 'discriminación auditiva':
      case 'discriminacion auditiva':
        navigate(`/actividad/discriminacion-auditiva/${ejercicio._id}`);
        break;
      case 'integración auditiva':
      case 'integracion auditiva':
        navigate(`/actividad/integracion-auditiva/${ejercicio._id}`);
        break;
      case 'imagen':
        navigate(`/actividad/imagen/${ejercicio._id}`);
        break;
      case 'imitacion':
        navigate(`/actividad/imitacion/${ejercicio._id}`);
        break;
      case 'historia':
        navigate(`/actividad/historia/${ejercicio._id}`);
        break;
      case 'problema':
        navigate(`/actividad/problema/${ejercicio._id}`);
        break;
      default:
        navigate(`/actividad/deteccion-auditiva/${ejercicio._id}`);
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

  if (!asignacion) {
    return (
      <Box sx={{ px: 4, py: 6 }}>
        <Alert severity="info">No tienes actividades asignadas en este momento.</Alert>
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
      <PatientNavbar username={asignacion.pacienteId?.name} />

      <Container maxWidth="md" sx={{ py: 5, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton onClick={() => navigate("/paciente-dashboard")}>
             <ArrowBack sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h3" fontWeight={900} sx={{ ml: 2, color: '#7B1FA2', letterSpacing: 1 }}>
            Nivel {asignacion.nivelId.number}
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
          <List>
            {asignacion.nivelId.actividades.map((actividad) => (
              <React.Fragment key={actividad._id}>
                <ListItem sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2, mb: 1 }}>
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
                      <ListItem sx={{ pl: 4, py: 2 }}>
                        <ListItemText
                          primary={
                            <Typography variant="h6" fontWeight={700}>
                              Ejercicio {index + 1}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Button
                            variant="contained"
                            onClick={() => handleComenzar(ejercicio, actividad.name)}
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
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider sx={{ my: 1, borderColor: '#e0e0e0', borderBottomWidth: 2 }} />
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>

      <PatientFooter />

      {showCompletedDialog && (
        <Dialog open={showCompletedDialog} onClose={() => setShowCompletedDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ textAlign: 'center', color: '#7B1FA2' }}>
            <EmojiEvents sx={{ fontSize: 60, color: '#FFD600', mb: 1 }} />
            ¡Nivel Completado!
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="success.main" gutterBottom>
              ¡Has terminado todas las actividades!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Ahora debes esperar la aprobación de tu fonoaudiólogo para pasar al siguiente nivel.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button
              variant="contained"
              onClick={() => setShowCompletedDialog(false)}
              sx={{
                backgroundColor: '#7B1FA2',
                color: 'white',
                borderRadius: '999px',
                px: 4,
                fontWeight: 600,
                '&:hover': { backgroundColor: '#6a1b9a' }
              }}
            >
              Entendido
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default AssignedActivities;
