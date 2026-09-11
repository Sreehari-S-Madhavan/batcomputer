const express = require('express');
const router = express.Router();
const { randomItem } = require('../utils/random');

router.post('/bat-signal', (req, res) => {
  const responses = [
    {
      status: "ACTIVATED",
      signal: "ON",
      response: "Nobody came.",
      reason: "Batman was already here."
    },
    {
      status: "ACTIVATED",
      signal: "ON",
      response: "Batman was already here.",
      reason: "He's been brooding for hours."
    },
    {
      status: "ACTIVATED",
      signal: "ON",
      response: "Signal blocked by clouds.",
      reason: "Gotham weather is too dramatic."
    },
    {
      status: "ACTIVATED",
      signal: "ON",
      response: "Alfred turned it off.",
      reason: "Batman needed rest."
    },
    {
      status: "ACTIVATED",
      signal: "ON",
      response: "Batman is sleeping.",
      reason: "Even brooding heroes need sleep."
    },
    {
      status: "ACTIVATED",
      signal: "ON",
      response: "Robin replied with a thumbs up.",
      reason: "Batman is busy."
    },
    {
      status: "ACTIVATED",
      signal: "ON",
      response: "Signal successfully illuminated absolutely nothing.",
      reason: "Gotham is suspiciously peaceful."
    }
  ];

  const response = randomItem(responses);
  res.json(response);
});

module.exports = router;
