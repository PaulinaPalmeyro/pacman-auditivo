// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#F3F6FD", py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Branding */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={700}>
              PACman Auditivo
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Software educativo para el entrenamiento de habilidades de procesamiento auditivo central.
            </Typography>
          </Grid>

          {/* Navegación */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600}>
              Navegación
            </Typography>
            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="#" underline="hover" color="inherit">
                Inicio
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Fonoaudiólogos
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Sobre Nosotros
              </Link>
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600}>
              Legal
            </Typography>
            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="#" underline="hover" color="inherit">
                Términos y Condiciones
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Política de Privacidad
              </Link>
            </Box>
          </Grid>

          {/* Redes sociales */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600}>
              Seguinos
            </Typography>
            <Box sx={{ mt: 1 }}>
              <IconButton aria-label="Facebook" size="small">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Instagram" size="small">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="Twitter" size="small">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} PACman Auditivo. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
