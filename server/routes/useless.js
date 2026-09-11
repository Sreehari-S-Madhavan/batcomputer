const express = require('express');
const router = express.Router();
const { randomItem } = require('../utils/random');
const uselessData = require('../data/useless.json');

router.get('/', (req, res) => {
  const response = {
    message: randomItem(uselessData.messages)
  };
  res.json(response);
});

module.exports = router;
