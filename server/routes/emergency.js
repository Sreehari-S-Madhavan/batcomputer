const express = require('express');
const router = express.Router();
const { randomItem } = require('../utils/random');
const emergencyData = require('../data/emergencies.json');

router.post('/', (req, res) => {
  const response = randomItem(emergencyData.responses);
  res.json(response);
});

module.exports = router;
