import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../../components/patients/PatientNavbar";
import PatientFooter from "../../components/patients/PatientFooter";
import authService from "../../services/authService";
import FondoFono from '../../assets/FondoFono.png';
import Astronauta1 from '../../assets/AstronautaParaPatientDashboard1.png';
import Astronauta2 from '../../assets/AstronautaParaPatientDashboard2.png';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [asignacion, setAsignacion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const userData = authService.getCurrentUser();
        if (!userData) {
          setError('No hay usuario logueado');
          setLoading(false);
          return;
        }

        setUser(userData);

        const asignacionData = await authService.getMisActividades();
        if (asignacionData.asignacion) {
          setAsignacion(asignacionData.asignacion);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(err.message || 'Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      position: 'relative',
    }}>
      {/* Astronauta izquierda */}
      <Box sx={{ position: 'absolute', left: 0, bottom: 40, zIndex: 1 }}>
        <img src={Astronauta1} alt="Astronauta 1" style={{ width: 180, maxWidth: '30vw' }} />
      </Box>
      {/* Astronauta derecha */}
      <Box sx={{ position: 'absolute', right: 0, top: 140, zIndex: 1 }}>
        <img src={Astronauta2} alt="Astronauta 2" style={{ width: 180, maxWidth: '30vw' }} />
      </Box>
      <PatientNavbar username={user?.name} />
      <Container maxWidth="md" sx={{ py: 6, flex: 1, position: 'relative', zIndex: 2 }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
            <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#7B1FA2' }}>
              ¡Bienvenido, {user?.name}!
            </span>
          </Typography>
          {asignacion ? (
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="h4" color="text.secondary" gutterBottom sx={{ fontWeight: 700 }}>
                Tienes actividades asignadas
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Nivel {asignacion.nivelId.number}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate("/actividades-asignadas")}
                  sx={{
                    py: 2,
                    px: 6,
                    backgroundColor: "#4caf50",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    borderRadius: "999px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#388e3c",
                    },
                  }}
                >
                  ¡Resolver Actividades! ({asignacion.ejercicios.filter(ej => ej.completo).length}/{asignacion.ejercicios.length})
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/historial-actividades")}
                  sx={{
                    py: 2,
                    px: 6,
                    borderRadius: '999px',
                    borderWidth: 2,
                    borderColor: '#1976d2',
                    color: '#1976d2',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    backgroundColor: 'white',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                      borderColor: '#1565c0',
                      color: '#1565c0',
                    },
                  }}
                >
                  Historial de Actividades
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No tienes actividades asignadas en este momento.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Por favor, espera a que tu fonoaudiólogo te asigne un nivel.
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
      <PatientFooter />
    </Box>
  );
};

export default PatientDashboard;
