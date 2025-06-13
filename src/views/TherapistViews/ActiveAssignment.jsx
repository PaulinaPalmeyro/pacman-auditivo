import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack
} from "@mui/material";
import { 
  ArrowBack, 
  Visibility, 
  CheckCircle, 
  Delete, 
  Edit,
  Warning,
  Assignment,
  Replay
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";
import authService from "../../services/authService";
import FondoFono from '../../assets/FondoFono.png';
import { generarPDFNivel } from '../../utils/pdfUtils';

const ActiveAssignment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [asignacion, setAsignacion] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [showNoAssignmentDialog, setShowNoAssignmentDialog] = useState(false);
  const [openReasignarDialog, setOpenReasignarDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const pacienteData = await authService.getPatientById(id);
        setPaciente(pacienteData);

        const asignacionData = await authService.getAsignacionActiva(id);
        if (!asignacionData.asignacion) {
          setShowNoAssignmentDialog(true);
          setLoading(false);
          return;
        }

        console.log('Datos de asignación:', asignacionData); // Para debugging
        setAsignacion(asignacionData.asignacion);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(err.message || 'Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const calcularProgresoNivel = () => {
    if (!asignacion?.ejercicios) return 0;
    const ejerciciosCompletos = asignacion.ejercicios.filter(ej => ej.completo).length;
    return (ejerciciosCompletos / asignacion.ejercicios.length) * 100;
  };

  const handleValidarProgreso = async () => {
    try {
      await authService.validarProgreso(asignacion._id);
      navigate(`/fono-dashboard/paciente/${id}`);
    } catch (err) {
      setError(err.message || 'Error al validar el progreso');
    }
  };

  const handleEditarAsignacion = async () => {
    try {
      // Crear una copia de los ejercicios actuales
      const ejerciciosActualizados = asignacion.ejercicios.map(ej => ({
        ...ej,
        completo: !ej.completo // Invertir el estado de completado
      }));

      await authService.editarAsignacion(asignacion._id, ejerciciosActualizados);
      
      // Actualizar el estado local
      setAsignacion(prev => ({
        ...prev,
        ejercicios: ejerciciosActualizados
      }));
    } catch (err) {
      setError(err.message || 'Error al editar la asignación');
    }
  };

  const handleEliminarAsignacion = async () => {
    try {
      await authService.eliminarAsignacion(asignacion._id);
      navigate(`/fono-dashboard/paciente/${id}`);
    } catch (err) {
      setError(err.message || 'Error al eliminar la asignación');
    }
  };

  const handleReasignarNivel = async () => {
    try {
      await authService.reasignarNivel(asignacion._id);
      setOpenReasignarDialog(false);
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Error al reasignar el nivel');
    }
  };

  const handleDescargarResultados = () => {
    if (!asignacion || !paciente) return;
    // Adaptar la estructura para la utilidad PDF
    const nivelData = {
      nivel: asignacion.nivelId,
      fechaAsignacion: asignacion.fechaAsignacion,
      actividades: asignacion.nivelId.actividades,
      ejercicios: asignacion.ejercicios
    };
    // Vincular los intentos y estado a cada ejercicio
    nivelData.actividades.forEach(actividad => {
      actividad.ejercicios.forEach(ejercicio => {
        const ejAsignado = asignacion.ejercicios.find(ej => ej.ejercicioId.toString() === ejercicio._id.toString());
        ejercicio.intentos = ejAsignado ? ejAsignado.intentos : [];
        ejercicio.completo = ejAsignado ? ejAsignado.completo : false;
      });
    });
    generarPDFNivel(nivelData, paciente.name);
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
    }}>
      <TherapistNavbar />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton onClick={() => navigate(`/fono-dashboard/paciente/${id}`)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight={700} sx={{ ml: 2 }}>
            Asignación Activa - {paciente?.name}
          </Typography>
        </Box>

        {asignacion ? (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Nivel {asignacion?.nivelId?.number}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Progreso del Nivel
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={calcularProgresoNivel()} 
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {calcularProgresoNivel().toFixed(1)}% completado
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Actividades y Ejercicios
            </Typography>

            {asignacion?.nivelId?.actividades?.length > 0 ? (
              <List>
                {asignacion.nivelId.actividades.map((actividad) => (
                  <React.Fragment key={actividad._id}>
                    <ListItem>
                      <ListItemText
                        primary={actividad.name}
                        secondary={actividad.description}
                      />
                    </ListItem>
                    <List component="div" disablePadding>
                      {actividad.ejercicios?.map((ejercicio) => {
                        const ejercicioAsignado = asignacion.ejercicios.find(
                          ej => ej.ejercicioId.toString() === ejercicio._id.toString()
                        );
                        return (
                          <ListItem key={ejercicio._id} sx={{ pl: 4 }}>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography>
                                    {ejercicio.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color={ejercicioAsignado?.completo ? "success.main" : "text.secondary"}
                                    sx={{ ml: 1 }}
                                  >
                                    {ejercicioAsignado?.completo ? "✓ Completado" : "Pendiente"}
                                  </Typography>
                                </Box>
                              }
                              secondary={ejercicio.description}
                            />
                            <IconButton
                              color="primary"
                              onClick={() => navigate(`/actividad/${asignacion._id}/ejercicio-asignado/${ejercicioAsignado?._id}`)}
                              sx={{ borderRadius: '50%', backgroundColor: '#f3e5f5', ml: 2 }}
                            >
                              <Visibility />
                            </IconButton>
                          </ListItem>
                        );
                      })}
                    </List>
                    <Divider sx={{ my: 2 }} />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                No hay actividades disponibles en este nivel.
              </Typography>
            )}

            <Stack 
              direction="row" 
              spacing={2} 
              justifyContent="center" 
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                startIcon={<CheckCircle />}
                onClick={handleValidarProgreso}
                sx={{
                  backgroundColor: "#4caf50",
                  "&:hover": { backgroundColor: "#388e3c" }
                }}
              >
                Validar Progreso
              </Button>
              <IconButton
                color="primary"
                onClick={handleEditarAsignacion}
                sx={{ 
                  backgroundColor: "#1976d2",
                  color: "white",
                  "&:hover": { backgroundColor: "#1565c0" }
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => setOpenDeleteDialog(true)}
                sx={{ 
                  backgroundColor: "#f44336",
                  color: "white",
                  "&:hover": { backgroundColor: "#d32f2f" }
                }}
              >
                <Delete />
              </IconButton>
              <Button
                variant="outlined"
                startIcon={<Replay />}
                onClick={() => setOpenReasignarDialog(true)}
                sx={{
                  borderColor: "#7B1FA2",
                  color: "#7B1FA2",
                  fontWeight: 600,
                  borderRadius: "999px",
                  px: 4,
                  "&:hover": { borderColor: "#6a1b9a", backgroundColor: "rgba(123, 31, 162, 0.04)" }
                }}
              >
                Reasignar Nivel
              </Button>
            </Stack>
          </Paper>
        ) : null}
        {asignacion && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ borderRadius: '999px', px: 4, fontWeight: 600 }}
              onClick={handleDescargarResultados}
            >
              Descargar Resultados
            </Button>
          </Box>
        )}
      </Container>

      <Dialog
        open={showNoAssignmentDialog}
        onClose={() => navigate(`/fono-dashboard/paciente/${id}`)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          color: '#7B1FA2'
        }}>
          <Assignment />
          Sin Asignación Activa
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 2, fontSize: '1.1rem' }}>
            El paciente {paciente?.name} no tiene una asignación activa en este momento.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}>
            Puedes asignar un nuevo nivel desde el perfil del paciente.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/fono-dashboard/paciente/${id}`)}
            sx={{
              backgroundColor: "#7B1FA2",
              color: "white",
              "&:hover": { backgroundColor: "#6a1b9a" }
            }}
          >
            Volver al Perfil
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/asignar-actividades/${id}`)}
            sx={{
              borderColor: "#7B1FA2",
              color: "#7B1FA2",
              "&:hover": { 
                borderColor: "#6a1b9a",
                backgroundColor: "rgba(123, 31, 162, 0.04)"
              }
            }}
          >
            Asignar Nuevo Nivel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Eliminar Asignación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta asignación? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleEliminarAsignacion} 
            color="error"
            startIcon={<Warning />}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openReasignarDialog}
        onClose={() => setOpenReasignarDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: '#7B1FA2', textAlign: 'center' }}>
          <Replay sx={{ fontSize: 40, color: '#7B1FA2', mb: 1 }} />
          Confirmar Reasignación de Nivel
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
            ¿Estás seguro que deseas reasignar este nivel?<br /><br />
            <b>Todos los ejercicios se marcarán como incompletos</b>, pero los intentos y el progreso histórico <b>no se perderán</b>.<br /><br />
            El paciente podrá volver a realizar todos los ejercicios de este nivel.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={() => setOpenReasignarDialog(false)} variant="outlined" sx={{ borderRadius: '999px', px: 4 }}>
            Cancelar
          </Button>
          <Button onClick={handleReasignarNivel} variant="contained" color="primary" sx={{ borderRadius: '999px', px: 4, backgroundColor: '#7B1FA2', '&:hover': { backgroundColor: '#6a1b9a' } }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <TherapistFooter />
    </Box>
  );
};

export default ActiveAssignment; 