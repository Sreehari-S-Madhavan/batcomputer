const express = require('express');
const router = express.Router();
const { randomItem, randomNumber, randomBoolean } = require('../utils/random');
const villainsData = require('../data/villains.json');

router.post('/villains', (req, res) => {
  // Simulate a delay of 2-3 seconds
  setTimeout(() => {
    const detectVillain = randomBoolean();
    const villainsDetected = detectVillain ? 1 : 0;

    const response = {
      scan_status: "COMPLETE",
      cameras_scanned: randomNumber(8000, 9000),
      arkham_checked: true,
      villains_detected: villainsDetected,
      result: villainsDetected === 0 ? "No villains found." : "Villain detected.",
      message: villainsDetected === 0 ? "Gotham is suspiciously peaceful." : "Suspicious activity detected."
    };

    if (villainsDetected === 1) {
      response.villain = randomItem(villainsData.villains);
    }

    res.json(response);
  }, 2000);
});

module.exports = router;
