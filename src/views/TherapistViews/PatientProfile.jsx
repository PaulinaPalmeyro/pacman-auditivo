// src/views/TherapistViews/PatientProfile.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { ArrowBack, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";

const mockPaciente = {
  nombre: "Lucía Fernández",
  dni: "12345678",
  fechaNacimiento: "2014-06-20",
  observaciones: "Paciente con dificultades para seguir instrucciones en ambientes ruidosos."
};

const PatientProfile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    navigate("/editar-paciente/1");
  };

  const handleDeleteConfirm = () => {
    setOpen(false);
    alert("Paciente eliminado (mock)");
    navigate("/fono-dashboard");
  };

  return (
    <Box>
      <TherapistNavbar username="Dra. Julieta Larrarte" />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={() => navigate("/fono-dashboard")}> 
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ flexGrow: 1 }}>
              {mockPaciente.nombre}
            </Typography>
            <IconButton onClick={handleEdit} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => setOpen(true)} color="error">
              <Delete />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight={600} display="inline">
                Nombre:&nbsp;
              </Typography>
              <Typography display="inline">{mockPaciente.nombre}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight={600} display="inline">
                DNI:&nbsp;
              </Typography>
              <Typography display="inline">{mockPaciente.dni}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" fontWeight={600} display="inline">
                Fecha de Nacimiento:&nbsp;
              </Typography>
              <Typography display="inline">{mockPaciente.fechaNacimiento}</Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" fontWeight={600} mt={4}>Observaciones:</Typography>
          <Typography>{mockPaciente.observaciones}</Typography>

          <Box sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/asignar-actividades/1")}
                  sx={{
                    py: 2,
                    backgroundColor: "#7B1FA2",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: "999px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#6a1b9a" },
                  }}
                >
                  Asignar Actividades
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/actividades-resueltas/1")}
                  sx={{
                    py: 2,
                    backgroundColor: "#1976d2",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: "999px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  Actividades Resueltas
                </Button>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              sx={{
                py: 2,
                mt: 2,
                width: "100%",
                backgroundColor: "#FBC02D",
                color: "#333",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "999px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#f9a825" },
              }}
            >
              Ver Observaciones del Usuario
            </Button>
          </Box>
        </Paper>
      </Container>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Eliminar paciente?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción es irreversible. ¿Estás seguro de que deseas eliminar este paciente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <TherapistFooter />
    </Box>
  );
};

export default PatientProfile;
