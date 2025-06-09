// src/components/therapists/TherapistNavbar.jsx
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { AccountCircle, Notifications } from "@mui/icons-material";
import authService from "../../services/authService";
import Badge from '@mui/material/Badge';

const TherapistNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUsername] = useState("");
  const [notifications, setNotifications] = useState([
    // Ejemplo de notificaciones simuladas
    // { pacienteId: '123', pacienteNombre: 'Bruno', mensaje: 'Bruno terminó todas sus actividades.' }
  ]);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUsername(user.name);
    }
  }, []);

  // Simulación: cargar notificaciones desde localStorage o API
  useEffect(() => {
    // Cargar notificaciones reales del backend
    const fetchNotificaciones = async () => {
      try {
        const data = await authService.getNotificacionesFono();
        setNotifications(data.notificaciones || []);
      } catch (err) {
        setNotifications([]);
      }
    };
    fetchNotificaciones();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      handleClose();
      navigate("/login");
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Aún si hay error, redirigimos al login
    handleClose();
    navigate("/login");
    }
  };

  const handleProfile = () => {
    handleClose();
    navigate("/ver-perfil");
  };

  const handleNotifMenu = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const handleVerAsignacion = async (pacienteId, asignacionId) => {
    try {
      await authService.marcarNotificacionLeida(asignacionId);
      setNotifications((prev) => prev.map(n => n.pacienteId === pacienteId ? { ...n, notificada: true } : n));
      handleNotifClose();
      navigate(`/asignacion-activa/${pacienteId}`);
    } catch (err) {
      handleNotifClose();
      navigate(`/asignacion-activa/${pacienteId}`);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#ffffff", boxShadow: "none", padding: "0.5rem 2rem" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo clickeable */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/fono-dashboard")}> 
          <img src={logo} alt="Logo" style={{ height: "70px", objectFit: "contain" }} />
        </Box>

        {/* Notificaciones */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleNotifMenu} sx={{ p: 0 }}>
            <Badge badgeContent={notifications.filter(n => !n.notificada).length} color="error">
              <Notifications sx={{ fontSize: 30, color: notifications.length > 0 ? "#FF9800" : "#7B1FA2" }} />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleNotifClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {notifications.length === 0 ? (
              <MenuItem disabled>No hay notificaciones</MenuItem>
            ) : (
              notifications.map((notif, idx) => (
                <MenuItem key={idx} sx={{ whiteSpace: 'normal', alignItems: 'flex-start', flexDirection: 'column', opacity: notif.notificada ? 0.5 : 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>{notif.mensaje}</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleVerAsignacion(notif.pacienteId, notif._id || notif.asignacionId)}
                    sx={{ borderRadius: '999px', backgroundColor: '#7B1FA2', color: 'white', textTransform: 'none', fontWeight: 600, '&:hover': { backgroundColor: '#6a1b9a' } }}
                  >
                    Ver Resultados
                  </Button>
                </MenuItem>
              ))
            )}
          </Menu>

        {/* Usuario e ícono */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={handleMenu} sx={{ p: 0 }}>
            <AccountCircle sx={{ fontSize: 30, color: "#7B1FA2" }} />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ ml: 1, color: "#7B1FA2", fontSize: "1.1rem" }}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TherapistNavbar;