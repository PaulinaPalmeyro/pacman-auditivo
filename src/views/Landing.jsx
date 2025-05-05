// src/views/Landing.jsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Container,
  useTheme,
  Grid,
  Stack,
  Paper
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import fonoaudiologaImage from "../assets/Fonoaudiologa-landing.jpg";
import logo from "../assets/logo.png";
import HearingIcon from '@mui/icons-material/Hearing';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import GroupsIcon from '@mui/icons-material/Groups';
import DescriptionIcon from '@mui/icons-material/Description';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const pastelBlue = '#B3E5FC';

const features = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: 'Ejercicios Interactivos',
    description: 'Actividades lúdicas diseñadas específicamente para mejorar las habilidades de procesamiento auditivo, organizadas por niveles progresivos.'
  },
  {
    icon: <InsertChartIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: 'Seguimiento de Progreso',
    description: 'Estadísticas detalladas y reportes de avance para monitorear el desarrollo de cada paciente, incluyendo porcentajes de aciertos y patrones de error.'
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: 'Gestión de Pacientes',
    description: 'Administración completa de perfiles, historial clínico y configuración personalizada de ejercicios para cada paciente.'
  },
  {
    icon: <VolumeUpIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: 'Entorno Controlado',
    description: 'Posibilidad de configurar ruido de fondo en los ejercicios para simular entornos reales y entrenar la comprensión auditiva en ambientes ruidosos.'
  },
  {
    icon: <SettingsIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: 'Personalización',
    description: 'El fonoaudiólogo puede configurar la dificultad, tipos de ejercicios y nivel de ruido de fondo según las necesidades específicas de cada paciente.'
  },
  {
    icon: <DescriptionIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    title: 'Informes y Análisis',
    description: 'Generación de reportes detallados sobre el desempeño del paciente, facilitando la evaluación y ajuste del tratamiento.'
  },
];

const Landing = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: 'white',
      width: '100vw',
      overflowX: 'hidden',
      position: 'relative',
    }}>
      {/* Botón Iniciar sesión arriba a la derecha */}
      <Box sx={{ position: 'absolute', top: 24, right: 32, zIndex: 1200 }}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1.1rem',
            boxShadow: '0 4px 15px rgba(33, 150, 243, 0.15)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
              boxShadow: '0 6px 20px rgba(33, 150, 243, 0.18)',
            },
          }}
        >
          Iniciar sesión
        </Button>
      </Box>

      {/* Header con logo grande */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: 'white', boxShadow: 'none', alignItems: 'center', pt: 4, pb: 2 }}>
        <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box component="img" src={logo} alt="Logo PACman Auditivo" sx={{ height: { xs: 140, sm: 200, md: 280 }, width: 'auto', mb: 2 }} />
        </Container>
      </AppBar>

      {/* Menú de navegación */}
      <Box sx={{ width: '100%', background: pastelBlue, py: 1, boxShadow: '0 2px 8px rgba(33,150,243,0.07)' }}>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Button component={Link} to="/" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.1rem', px: 4, py: 1.5, color: '#01579B' }}>
              Inicio
            </Button>
            <Button component={Link} to="/fonoaudiologos" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.1rem', px: 4, py: 1.5, color: '#01579B' }}>
              Fonoaudiólogos
            </Button>
            <Button component={Link} to="/sobre-nosotros" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.1rem', px: 4, py: 1.5, color: '#01579B' }}>
              Sobre nosotros
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Hero principal */}
      <Box sx={{ width: '100%', py: { xs: 6, md: 10 }, background: 'linear-gradient(180deg, #f5f7fa 0%, #fff 100%)' }}>
        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 2, fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' } }}>
                  Mejorá la escucha jugando
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '700px', lineHeight: 1.6, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}>
                  Una herramienta para que los fonoaudiólogos entrenen habilidades auditivas en niños de manera lúdica, segura y personalizada.
                </Typography>
                <Button component={Link} to="/login" variant="contained" size="large" sx={{ mt: 4, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', borderRadius: 3, px: 5, py: 2, fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Comenzar ahora
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <Box component="img" src={fonoaudiologaImage} alt="Ilustración de fonoaudiologa" sx={{ width: '100%', maxWidth: '720px', borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.10)', '&:hover': { transform: 'scale(1.03)' } }} />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

{/* Características principales */}
<Box sx={{ py: 12, px: 2, backgroundColor: 'white' }}>
  <Container maxWidth="lg">
    <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
      Características Principales
    </Typography>
    <Typography
      variant="subtitle1"
      color="text.secondary"
      align="center"
      sx={{ mb: 8, maxWidth: 700, mx: 'auto' }}
    >
      PACman Auditivo ofrece herramientas especializadas para el entrenamiento de habilidades auditivas en niños.
    </Typography>

    <Grid container spacing={4}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
          <Box
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'box-shadow 0.3s ease',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: '#E3F2FD',
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                mb: 2,
              }}
            >
              {feature.icon}
            </Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feature.description}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>



      {/* Footer estándar */}
      <Box sx={{ width: '100%', py: 4, background: '#f5f7fa', textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} PACman Auditivo — Todos los derechos reservados
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;