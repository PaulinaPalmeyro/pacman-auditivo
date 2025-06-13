// src/views/TherapistViews/PatientProfile.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  CircularProgress,
  Alert
} from "@mui/material";
import { ArrowBack, Edit, Delete } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";
import authService from "../../services/authService";
import FondoFono from '../../assets/FondoFono.png';

const PatientProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const data = await authService.getPatientById(id);
        setPaciente(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos del paciente');
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleEdit = () => {
    navigate(`/editar-paciente/${id}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      await authService.deletePatient(id);
      setOpen(false);
      navigate("/fono-dashboard");
    } catch (err) {
      setError(err.message || 'Error al eliminar el paciente');
      setOpen(false);
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

  if (!paciente) {
    return (
      <Box sx={{ px: 4, py: 6 }}>
        <Alert severity="warning">Paciente no encontrado</Alert>
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
      <TherapistNavbar username="Dra. Julieta Larrarte" />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={() => navigate("/fono-dashboard")}> 
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ flexGrow: 1 }}>
              {paciente.name}
            </Typography>
            <IconButton onClick={handleEdit} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => setOpen(true)} color="error">
              <Delete />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight={600} display="inline">
                Nombre:&nbsp;
              </Typography>
              <Typography display="inline">{paciente.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight={600} display="inline">
                DNI:&nbsp;
              </Typography>
              <Typography display="inline">{paciente.dni}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight={600} display="inline">
                Fecha de Nacimiento:&nbsp;
              </Typography>
              <Typography display="inline">
                {new Date(paciente.fechaNacimiento).toLocaleDateString('es-AR', { timeZone: 'UTC' })}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight={600} display="inline">
                Email:&nbsp;
              </Typography>
              <Typography display="inline">{paciente.email}</Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" fontWeight={600} mt={4}>Observaciones:</Typography>
          <Typography>{paciente.observaciones || 'No hay observaciones registradas'}</Typography>

          <Box sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/asignar-actividades/${id}`)}
                  sx={{
                    py: 2,
                    backgroundColor: "#7B1FA2",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: "999px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#6a1b9a" },
                  }}
                >
                  Asignar Actividades
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/asignacion-activa/${id}`)}
                  sx={{
                    py: 2,
                    backgroundColor: "#1976d2",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: "999px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  Ver Asignación Activa
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/historial-niveles/${id}`)}
                  sx={{
                    py: 2,
                    backgroundColor: "#FF9800",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: "999px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#F57C00" },
                  }}
                >
                  Historial de Ejercicios
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Eliminar paciente?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción es irreversible. ¿Estás seguro de que deseas eliminar este paciente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <TherapistFooter />
    </Box>
  );
};

export default PatientProfile;
