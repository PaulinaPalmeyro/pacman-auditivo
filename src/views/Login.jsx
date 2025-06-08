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
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usuario: "mockUser",
    password: "1234",
    rol: "fono"
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.rol === "fono") {
      navigate("/fono-dashboard");
    } else {
      navigate("/paciente-dashboard");
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

          <form onSubmit={handleLogin}>
            <TextField
              select
              fullWidth
              label="Ingresar como"
              name="rol"
              value={form.rol}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="fono">Fonoaudiólogo/a</MenuItem>
              <MenuItem value="paciente">Paciente</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Usuario"
              name="usuario"
              value={form.usuario}
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
