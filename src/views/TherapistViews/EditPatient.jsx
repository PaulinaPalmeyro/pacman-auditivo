// src/views/TherapistViews/EditPatient.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";
import authService from "../../services/authService";
import FondoFono from '../../assets/FondoFono.png';

const EditPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    fechaNacimiento: "",
    observaciones: ""
  });

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const data = await authService.getPatientById(id);
        setFormData({
          name: data.name,
          dni: data.dni,
          fechaNacimiento: data.fechaNacimiento.split('T')[0], // Formatear fecha para el input
          observaciones: data.observaciones || ""
        });
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos del paciente');
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.updatePatient(id, formData);
      navigate(`/fono-dashboard/paciente/${id}`);
    } catch (err) {
      setError(err.message || 'Error al actualizar los datos del paciente');
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
    }}>
      <TherapistNavbar username="Dra. Julieta Larrarte" />

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
            Editar Paciente
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/fono-dashboard/paciente/${id}`)}
                sx={{ borderRadius: "999px", px: 4 }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#7B1FA2",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "999px",
                  px: 4,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#6a1b9a" },
                }}
              >
                Guardar Cambios
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>

      <TherapistFooter />
    </Box>
  );
};

export default EditPatient;
