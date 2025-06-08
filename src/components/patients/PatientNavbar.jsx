import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { AccountCircle } from "@mui/icons-material";

const PatientNavbar = ({ username }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/login");
  };

  const handleProfile = () => {
    handleClose();
    navigate("/paciente-perfil");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#7B1FA2",
        padding: "0.5rem 2rem",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo clickeable que lleva a la Landing */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "65px", objectFit: "contain" }}
          />
        </Box>

        {/* Usuario e ícono */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={handleMenu} sx={{ p: 0 }}>
            <AccountCircle sx={{ fontSize: 30, color: "#fff" }} />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ ml: 1, color: "#fff", fontSize: "1.1rem" }}
            >
              {username}
            </Typography>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleProfile}>Ver Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PatientNavbar;
