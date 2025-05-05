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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";



const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usuario: "mockUser",
    password: "1234"
  });
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/fono-dashboard");
  };

  const handleBack = () => {
    navigate("/");
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
              fullWidth
              label="Usuario"
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
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