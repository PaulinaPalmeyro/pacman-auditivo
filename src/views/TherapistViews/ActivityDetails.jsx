// src/views/TherapistViews/ActivityDetails.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { ArrowBack, Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TherapistNavbar from "../../components/therapists/TherapistNavbar";
import TherapistFooter from "../../components/therapists/TherapistFooter";

const mockIntentos = [
  { intento: 1, respuesta: "pa-ta-ka", resultado: "Correcto" },
  { intento: 2, respuesta: "pa-ka-ta", resultado: "Incorrecto" },
  { intento: 3, respuesta: "pa-ta-ka", resultado: "Correcto" },
];

const mockAnalisis =
  "El paciente mostró una mejora en la articulación y secuenciación de sonidos. Se detectaron errores leves en el segundo intento, posiblemente relacionados con distracción momentánea. Se recomienda continuar con ejercicios similares para reforzar la secuencia auditiva.";

const ActivityDetails = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    alert("Descargando informe (mock)");
  };

  return (
    <Box>
      <TherapistNavbar username="Dra. Julieta Larrarte" />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate("/actividades-resueltas/1")}> 
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ flexGrow: 1 }}>
            Detalles de la Actividad
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Intentos del paciente
          </Typography>
          <List>
            {mockIntentos.map((intento, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Intento ${intento.intento}: ${intento.respuesta}`}
                    secondary={`Resultado: ${intento.resultado}`}
                  />
                </ListItem>
                {index < mockIntentos.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Análisis de Resultados (IA)
          </Typography>
          <Typography sx={{ mb: 3 }}>{mockAnalisis}</Typography>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleDownload}
            sx={{
              backgroundColor: "#7B1FA2",
              color: "white",
              fontWeight: 600,
              borderRadius: "999px",
              px: 4,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#6a1b9a",
              },
            }}
          >
            Descargar Detalles
          </Button>
        </Paper>
      </Container>

      <TherapistFooter />
    </Box>
  );
};

export default ActivityDetails;