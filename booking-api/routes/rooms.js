const express = require('express');
const router = express.Router();
const habitaciones = require('../data/rooms.json');

// GET /api/rooms?hotel_id=1
router.get('/', (req, res) => {
  const hotelId = parseInt(req.query.hotel_id);
  if (!hotelId) {
    return res.status(400).json({ error: 'hotel_id es requerido' });
  }

  const disponibles = habitaciones.filter(h => h.hotel_id === hotelId && h.disponible);
  res.json(disponibles);
});

module.exports = router;
