const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/reservations.json');

// Leer las reservas
function getReservations() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

// Guardar las reservas
function saveReservations(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// GET: Buscar reservas
router.get('/', (req, res) => {
  const reservations = getReservations();
  res.json(reservations);
});

// POST: Crear una nueva reserva
router.post('/', (req, res) => {
  const reservations = getReservations();
  const newReservation = { id: Date.now(), ...req.body };
  reservations.push(newReservation);
  saveReservations(reservations);
  res.status(201).json(newReservation);
});

// PUT: Actualizar una reserva existente
router.put('/:id', (req, res) => {
  const reservations = getReservations();
  const id = parseInt(req.params.id);
  const index = reservations.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }

  reservations[index] = { ...reservations[index], ...req.body };
  saveReservations(reservations);
  res.json(reservations[index]);
});

module.exports = router;
