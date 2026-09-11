const express = require('express');
const router = express.Router();
const { randomItem, randomNumber, randomFromRange } = require('../utils/random');
const weatherData = require('../data/weather.json');

router.get('/', (req, res) => {
  const response = {
    temperature: randomNumber(10, 25),
    unit: "C",
    condition: randomItem(weatherData.conditions),
    visibility: randomItem(["Moody", "Dramatic", "Mysterious", "Batman", "Gotham"]),
    humidity: randomNumber(70, 95),
    message: randomItem(weatherData.messages)
  };
  res.json(response);
});

module.exports = router;
