// src/views/TherapistViews/RegisterPatient.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";

const RegisterPatient = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    fechaNacimiento: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate("/fono-dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Paciente registrado:", form);
    navigate("/paciente/1"); // redirección mock a perfil futuro
  };

  return (
    <Box>
      <TherapistNavbar username="Dra. Julieta Larrarte" />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
            Registrar nuevo paciente
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre completo"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="DNI"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Fecha de nacimiento"
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Observaciones"
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                sx={{ borderRadius: "999px", px: 4 }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#7B1FA2",
                  borderRadius: "999px",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#6a1b9a",
                  },
                }}
              >
                Registrar
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
      <TherapistFooter />
    </Box>
  );
};

export default RegisterPatient;
