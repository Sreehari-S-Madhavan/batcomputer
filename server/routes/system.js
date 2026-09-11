const express = require('express');
const router = express.Router();
const { randomItem, randomNumber, randomPercentage } = require('../utils/random');

router.get('/', (req, res) => {
  const cpuValues = [12, 47, 87, 99, "Too much"];
  const securityLevels = [
    "Probably secure",
    "Very secure",
    "Batman secure",
    "Secure enough",
    "Alfred approved it",
    "We think it's secure"
  ];
  const alfredStatuses = [
    "Making tea",
    "Preparing dinner",
    "Cleaning the Batcave",
    "Calling Batman",
    "Reading a book",
    "Watching the news",
    "Organizing the Batmobile",
    "Ignoring Batman's calls",
    "Serving justice",
    "Being Alfred"
  ];

  const selectedCpu = randomItem(cpuValues);
  const response = {
    system: "BATCOMPUTER",
    version: "7.1",
    cpu_usage: typeof selectedCpu === 'number' ? `${selectedCpu}%` : selectedCpu,
    memory_usage: `${randomPercentage()}%`,
    reason: "Rendering unnecessary bat animations",
    security: randomItem(securityLevels),
    alfred_status: randomItem(alfredStatuses)
  };
  res.json(response);
});

module.exports = router;
