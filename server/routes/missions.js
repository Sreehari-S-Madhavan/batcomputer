const express = require('express');
const router = express.Router();
const { randomItem } = require('../utils/random');
const missionsData = require('../data/missions.json');

router.get('/', (req, res) => {
  res.json({
    total: missionsData.missions.length,
    missions: missionsData.missions,
    active_focus: randomItem(missionsData.missions)
  });
});

router.post('/:id/execute', (req, res) => {
  const mission = missionsData.missions.find(m => m.id === req.params.id) || randomItem(missionsData.missions);
  const outcomes = [
    "Mission successfully postponed for further brooding.",
    "Batman stared at the mission log for 45 minutes. No action taken.",
    "Alfred marked this as completed. Batman disagreed silently.",
    "Mission objective achieved: Zero progress made.",
    "Batmobile dispatched to dramatic overlook. Mission ignored."
  ];

  res.json({
    id: mission.id,
    name: mission.name,
    status: "EXTREMELY PENDING",
    outcome: randomItem(outcomes),
    justice_level: "Unchanged (100%)"
  });
});

module.exports = router;
