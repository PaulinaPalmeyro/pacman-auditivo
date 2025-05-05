// src/components/therapist/PatientList.jsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const mockPacientes = [
  { nombre: "Lucía Fernández", edad: 9 },
  { nombre: "Mateo González", edad: 7 },
  { nombre: "Valentina López", edad: 10 },
];

const PatientList = () => {

    const navigate = useNavigate();

    const handleRegistrar = () => {
        navigate("/register-patient");
      };

      const handleVerPerfil = () => {
        navigate("/paciente/1");
      };

      return (
        <Box sx={{ px: 4, py: 6, backgroundColor: "#f9fbfd", minHeight: "100vh" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" fontWeight={700} textAlign="center" mb={2}>
              Lista de Pacientes
            </Typography>
            <Button
              variant="contained"
              onClick={handleRegistrar}
              sx={{
                backgroundColor: "#7B1FA2",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "999px",
                px: 4,
                py: 1.2,
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#6a1b9a",
                },
              }}
            >
              Registrar Paciente
            </Button>
          </Box>
    
          <Grid container spacing={4} justifyContent="center">
            {mockPacientes.map((paciente, index) => (
              <Grid item xs={12} sm={10} md={8} key={index}>
                <Card sx={{ borderRadius: 4, px: 3, py: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {paciente.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Edad: {paciente.edad} años
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="medium"
                      variant="outlined"
                      onClick={handleVerPerfil}
                      sx={{
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: "999px",
                      }}
                    >
                      Ver Perfil
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    };
    
    export default PatientList;
    