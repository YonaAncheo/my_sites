const express = require('express');
const app = express();
const port = 3000;

const reservationsRouter = require('./routes/reservations');

app.use(express.json()); // aceptar JSON

// Punto de entrada para SPA
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la plataforma de reservas de hoteles SPA' });
});

// Rutas de reservas
app.use('/api/reservations', reservationsRouter);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
