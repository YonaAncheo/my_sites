const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Paths a los JSON mock
const pathReservations = path.join(__dirname, 'data/reservations.json');
const pathHotels = path.join(__dirname, 'data/hotels.json');
const pathRooms = path.join(__dirname, 'data/rooms.json');

// === API reservations ===
app.get('/api/reservations', (req, res) => {
  const reservations = JSON.parse(fs.readFileSync(pathReservations));
  res.json(reservations);
});

app.post('/api/reservations', (req, res) => {
  const reservations = JSON.parse(fs.readFileSync(pathReservations));
  const newReservation = { id: Date.now(), ...req.body };
  reservations.push(newReservation);
  fs.writeFileSync(pathReservations, JSON.stringify(reservations, null, 2));
  res.status(201).json(newReservation);
});

app.put('/api/reservations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let reservations = JSON.parse(fs.readFileSync(pathReservations));
  const index = reservations.findIndex(r => r.id === id);
  if (index !== -1) {
    reservations[index] = { id, ...req.body };
    fs.writeFileSync(pathReservations, JSON.stringify(reservations, null, 2));
    res.json(reservations[index]);
  } else {
    res.status(404).json({ error: 'Reserva no encontrada' });
  }
});

// === API HOTELES ===
app.get('/api/hotels', (req, res) => {
  const hotels = JSON.parse(fs.readFileSync(pathHotels));
  res.json(hotels);
});

// === API rooms ===
app.get('/api/rooms', (req, res) => {
  const rooms = JSON.parse(fs.readFileSync(pathRooms));
  const { hotel_id } = req.query;
  if (hotel_id) {
    const filters = rooms.filter(h => h.hotel_id == hotel_id);
    res.json(filters);
  } else {
    res.json(rooms);
  }
});

// Ruta para SPA
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
