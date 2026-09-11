const express = require('express');
const router = express.Router();
const { randomItem } = require('../utils/random');
const messagesData = require('../data/messages.json');

router.get('/', (req, res) => {
  res.json({
    alfred: randomItem(messagesData.alfred_messages),
    system: randomItem(messagesData.system_messages)
  });
});

router.get('/alfred', (req, res) => {
  res.json({
    sender: "Alfred Pennyworth",
    channel: "SECURE_BUTLER_FEED",
    timestamp: new Date().toLocaleTimeString(),
    message: randomItem(messagesData.alfred_messages)
  });
});

router.get('/system', (req, res) => {
  res.json({
    sender: "BATCOMPUTER AI v7.1",
    channel: "CORE_SYSTEM_NOTIFICATIONS",
    timestamp: new Date().toLocaleTimeString(),
    message: randomItem(messagesData.system_messages)
  });
});

module.exports = router;
