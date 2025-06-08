// src/views/Login.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Person,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import authService from "../services/authService";
import useUserStore from "../store/useUserStore";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Limpiar error cuando el usuario modifica el formulario
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(form.email, form.password);
      setUser(response);
      
      // Redirección basada en el rol que devuelve el backend
      if (response.role === "fonoaudiologo") {
        navigate("/fono-dashboard");
      } else if (response.role === "paciente") {
        navigate("/paciente-dashboard");
      } else {
        setError("Rol de usuario no válido");
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <img src={logo} alt="Logo" style={{ height: "80px" }} />
      </Box>

      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
            Iniciar Sesión
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
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
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => alert("Recuperar contraseña (mock)")}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ borderRadius: "999px", px: 4 }}
              >
                Volver atrás
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
                Ingresar
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
