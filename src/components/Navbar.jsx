// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "none",
        padding: "0.5rem 2rem",
      }}
    >
      <Toolbar
        sx={{
          position: "relative",
          justifyContent: "space-between",
          minHeight: "90px",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="PACman Auditivo"
            style={{
              height: "100px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Botones centrados */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 3,
          }}
        >
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            sx={{
              fontSize: "1rem",
              px: 3,
              py: 1.5,
              backgroundColor: isActive("/") ? "#7B1FA2" : "#e0e0e0",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              color: isActive("/") ? "#ffffff" : "#333",
              "&:hover": {
                backgroundColor: isActive("/") ? "#6a1b9a" : "#d5d5d5",
              },
            }}
          >
            Inicio
          </Button>

          <Button
            component={RouterLink}
            to="/fonoaudiologos"
            variant="contained"
            sx={{
              fontSize: "1rem",
              px: 3,
              py: 1.5,
              backgroundColor: isActive("/fonoaudiologos") ? "#7B1FA2" : "#e0e0e0",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              color: isActive("/fonoaudiologos") ? "#ffffff" : "#333",
              "&:hover": {
                backgroundColor: isActive("/fonoaudiologos") ? "#6a1b9a" : "#d5d5d5",
              },
            }}
          >
            Fonoaudiólogos
          </Button>

          <Button
              component={RouterLink}
              to="/sobre-nosotros"
              variant="contained"
              sx={{
                fontSize: "1rem",
                px: 3,
                py: 1.5,
                backgroundColor: isActive("/sobre-nosotros") ? "#7B1FA2" : "#e0e0e0",
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                color: isActive("/sobre-nosotros") ? "#ffffff" : "#333",
                "&:hover": {
                  backgroundColor: isActive("/sobre-nosotros") ? "#6a1b9a" : "#d5d5d5",
                },
              }}
            >
              Sobre Nosotros
            </Button>
        </Box>

        {/* Botón de login a la derecha */}
        <Box>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            sx={{
              fontSize: "1rem",
              px: 3,
              py: 1.5,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              color: "#7B1FA2",
              borderColor: "#7B1FA2",
              "&:hover": {
                backgroundColor: "#f3e5f5",
                borderColor: "#7B1FA2",
              },
            }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
