const express = require('express');
const router = express.Router();
const { randomItem, randomNumber, randomPercentage } = require('../utils/random');
const crimesData = require('../data/crimes.json');

router.get('/threat', (req, res) => {
  const threatScore = randomNumber(85, 100);
  const reasons = [
    "Unknown",
    "Batman feels something",
    "Suspicious pigeon",
    "Alfred has concerns",
    "Someone walked strangely",
    "The wind looked suspicious",
    "No reason detected",
    "Batman's intuition",
    "Atmospheric pressure",
    "Gotham being Gotham"
  ];

  const response = {
    threat_level: threatScore > 90 ? "EXTREME" : "HIGH",
    threat_score: threatScore,
    reason: randomItem(reasons),
    crime_detected: 0,
    message: "Gotham is suspiciously peaceful."
  };
  res.json(response);
});

router.get('/crime', (req, res) => {
  const response = {
    crime_detected: 0,
    robberies: 0,
    villains: 0,
    suspicious_clowns: 0,
    suspicious_pigeons: randomNumber(0, 3),
    stolen_pizzas: 0,
    dramatic_rooftop_incidents: 0,
    missing_socks: randomNumber(40, 60),
    illegal_bat_signals: 0,
    unexplained_screaming: 0,
    bad_parking: randomNumber(15, 30),
    late_night_snacking: randomNumber(100, 200),
    suspicious_umbrella_usage: randomNumber(5, 20),
    overly_dramatic_posing: randomNumber(0, 5),
    slow_walking: randomNumber(50, 100),
    public_humming: randomNumber(20, 50),
    status: randomItem(crimesData.status_messages)
  };
  res.json(response);
});

module.exports = router;
