const express = require('express');
const app = express();
const port = 3000;


const reservationsRouter = require('./routes/reservations');

app.use(express.json()); // aceptar JSON

// Punto de entrada para SPA
app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
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
