// src/components/therapist/PatientList.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const PatientList = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await authService.getMyPatients();
        setPacientes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar los pacientes');
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const handleRegistrar = () => {
    navigate("/register-patient");
  };

  const handleVerPerfil = (pacienteId) => {
    navigate(`/fono-dashboard/paciente/${pacienteId}`);
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
    <Box sx={{ px: 4, py: 6, backgroundColor: "#f9fbfd", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={2}>
          Lista de Pacientes
        </Typography>
        <Button
          variant="contained"
          onClick={handleRegistrar}
          sx={{
            backgroundColor: "#7B1FA2",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "999px",
            px: 4,
            py: 1.2,
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#6a1b9a",
            },
          }}
        >
          Registrar Paciente
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {pacientes.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No hay pacientes registrados
            </Typography>
          </Grid>
        ) : (
          pacientes.map((paciente) => (
            <Grid item xs={12} sm={10} md={8} key={paciente._id}>
              <Card sx={{ borderRadius: 4, px: 3, py: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {paciente.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    DNI: {paciente.dni}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de Nacimiento: {new Date(paciente.fechaNacimiento).toLocaleDateString()}
                  </Typography>
                  {paciente.observaciones && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Observaciones: {paciente.observaciones}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    variant="outlined"
                    onClick={() => handleVerPerfil(paciente._id)}
                    sx={{
                      borderColor: "#1976d2",
                      color: "#1976d2",
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: "999px",
                    }}
                  >
                    Ver Perfil
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PatientList;
    