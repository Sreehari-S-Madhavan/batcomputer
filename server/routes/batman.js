const express = require('express');
const router = express.Router();
const { randomItem, randomNumber, randomPercentage } = require('../utils/random');
const batmanData = require('../data/batman.json');

router.get('/status', (req, res) => {
  const response = {
    status: randomItem(batmanData.statuses),
    location: randomItem(batmanData.locations),
    suit: randomItem(batmanData.suits),
    energy: randomPercentage(),
    mood: randomItem(batmanData.moods),
    current_activity: randomItem(batmanData.activities)
  };
  res.json(response);
});

module.exports = router;
