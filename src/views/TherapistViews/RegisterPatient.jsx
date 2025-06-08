// src/views/TherapistViews/RegisterPatient.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";
import authService from "../../services/authService";

const RegisterPatient = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    dni: "",
    fechaNacimiento: "",
    observaciones: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    navigate("/fono-dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.createPatient(
        form.email,
        form.name,
        form.password,
        form.dni,
        form.fechaNacimiento,
        form.observaciones
      );

      setSuccess('Paciente registrado correctamente');
      
      // Limpiar el formulario
      setForm({
        email: "",
        name: "",
        password: "",
        dni: "",
        fechaNacimiento: "",
        observaciones: "",
      });

      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate("/fono-dashboard");
      }, 3000);
    } catch (err) {
      setError(err.message || "Error al registrar paciente");
    }
  };

  return (
    <Box>
      <TherapistNavbar username="Dra. Julieta Larrarte" />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
            Registrar nuevo paciente
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Nombre completo"
              name="name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "999px",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#6a1b9a",
                  },
                }}
              >
                Registrar Paciente
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
