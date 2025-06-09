// src/views/TherapistViews/AssignActivities.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Divider,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Collapse,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { Edit, ExpandLess, ExpandMore, CheckCircle } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";
import authService from "../../services/authService";
import FondoFono from '../../assets/FondoFono.png';

const AssignActivities = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [niveles, setNiveles] = useState([]);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [expandedNivel, setExpandedNivel] = useState(null);
  const [asignaciones, setAsignaciones] = useState([]);
  const [showActiveAssignmentDialog, setShowActiveAssignmentDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos del paciente
        const pacienteData = await authService.getPatientById(id);
        setPaciente(pacienteData);

        // Verificar si hay una asignación activa
        const asignacionData = await authService.getAsignacionActiva(id);
        if (asignacionData.asignacion) {
          setShowActiveAssignmentDialog(true);
          setLoading(false);
          return;
        }

        // Obtener historial de asignaciones
        const asignacionesData = await authService.getAsignaciones(id);
        setAsignaciones(asignacionesData.asignaciones);

        // Obtener niveles con sus actividades y ejercicios
        const nivelesData = await authService.getNiveles();
        setNiveles(nivelesData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleNivelSelect = (nivelId) => {
    setNivelSeleccionado(nivelSeleccionado === nivelId ? null : nivelId);
  };

  const handleToggleExpand = (nivelId) => {
    setExpandedNivel(expandedNivel === nivelId ? null : nivelId);
  };

  const handleCancel = () => {
    navigate(`/fono-dashboard/paciente/${id}`);
  };

  const handleSave = async () => {
    if (!nivelSeleccionado) {
      setError('Por favor selecciona un nivel');
      return;
    }

    try {
      await authService.asignarNivel(id, nivelSeleccionado);
      navigate(`/fono-dashboard/paciente/${id}`);
    } catch (err) {
      setError(err.message || 'Error al asignar el nivel');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (showActiveAssignmentDialog) {
    return (
      <Dialog open={showActiveAssignmentDialog} onClose={() => navigate(`/fono-dashboard/paciente/${id}`)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', color: '#7B1FA2' }}>
          Asignación activa
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', fontSize: '1.1rem', py: 3 }}>
          El paciente ya tiene una asignación activa.<br />
          Debe completar o cancelar la asignación actual antes de asignar un nuevo nivel.
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/fono-dashboard/paciente/${id}`)}
            sx={{
              backgroundColor: "#7B1FA2",
              color: "white",
              fontWeight: 700,
              borderRadius: "999px",
              px: 6,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#6a1b9a",
              },
            }}
          >
            Volver al perfil
          </Button>
        </DialogActions>
      </Dialog>
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
    }}>
      <TherapistNavbar />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
          Asignar Nivel
        </Typography>

        <Typography variant="subtitle1" textAlign="center" mb={4}>
          Paciente: {paciente?.name}
        </Typography>

        {niveles.map((nivel) => {
          // Buscar si el nivel ya fue completado
          const nivelCompletado = asignaciones.find(
            asignacion => 
              asignacion.nivelId._id === nivel._id && 
              asignacion.completo
          );

          return (
            <Paper key={nivel._id} elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
              <ListItem button onClick={() => handleToggleExpand(nivel._id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={nivelSeleccionado === nivel._id}
                    onChange={() => handleNivelSelect(nivel._id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" fontWeight={600} color="#7B1FA2">
                        Nivel {nivel.number}
                      </Typography>
                      {nivelCompletado && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'success.main',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            ml: 1
                          }}
                        >
                          <CheckCircle fontSize="small" />
                          Completado
                        </Typography>
                      )}
                    </Box>
                  }
                  secondary={nivel.description}
                />
                {expandedNivel === nivel._id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={expandedNivel === nivel._id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {nivel.actividades?.map((actividad) => (
                    <React.Fragment key={actividad._id}>
                      <ListItem sx={{ pl: 4 }}>
                        <ListItemText
                          primary={actividad.name}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {actividad.description}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Ejercicios: {actividad.ejercicios?.length || 0}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            </Paper>
          );
        })}

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleCancel}
            sx={{ 
              borderRadius: "999px", 
              px: 10,
              backgroundColor: '#757575',
              color: 'white',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#424242' }
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!nivelSeleccionado}
            sx={{
              backgroundColor: "#7B1FA2",
              color: "white",
              fontWeight: 700,
              borderRadius: "999px",
              px: 11,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#6a1b9a",
              },
            }}
          >
            Guardar
          </Button>
        </Stack>
      </Container>

      <TherapistFooter />
    </Box>
  );
};

export default AssignActivities;
