const express = require('express');
const router = express.Router();
const hoteles = require('../data/hotels.json');

router.get('/', (req, res) => {
  res.json(hoteles);
});

module.exports = router;
