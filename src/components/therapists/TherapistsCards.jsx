// src/components/therapists/TherapistsCards.jsx
import React from "react";
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import GenericImage from "../../assets/FonoGenerica.jpg";

const fonoaudiologas = [
  { nombre: "Martina Ojeda", imagen: GenericImage },
  { nombre: "Julieta Larrarte", imagen: GenericImage },
  { nombre: "Luz Gallardi", imagen: GenericImage },
];

const TherapistsCards = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Typography variant="h5" align="center" gutterBottom>
          Conocé a nuestras profesionales
        </Typography>
        <Grid container spacing={4} justifyContent="center" mt={2}>
          {fonoaudiologas.map((fono, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345, margin: "auto" }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={fono.imagen}
                  alt={fono.nombre}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {fono.nombre}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TherapistsCards;
