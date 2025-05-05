// src/views/TherapistViews/EditPatient.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";

const EditPatient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "Lucía Fernández",
    dni: "12345678",
    fechaNacimiento: "2014-06-20",
    observaciones: "Paciente con dificultades para seguir instrucciones en ambientes ruidosos."
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Datos del paciente actualizados (mock)");
    navigate("/paciente/1");
  };

  return (
    <Box>
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
              name="nombre"
              value={formData.nombre}
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
                onClick={() => navigate("/paciente/1")}
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
