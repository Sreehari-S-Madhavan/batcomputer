const express = require('express');
const router = express.Router();
const { randomItem, randomNumber } = require('../utils/random');

router.get('/balance', (req, res) => {
  const baseBalance = 84729381204;
  const change = randomNumber(1000000, 5000000);
  const messages = [
    "Bruce made money while brooding.",
    "Lucius found another investment.",
    "Wayne Enterprises survived another Tuesday.",
    "Money detected. Nobody knows why.",
    "The shareholders remain confused.",
    "Batman's brooding generated revenue.",
    "Alfred made a wise investment.",
    "Gotham's peace is profitable.",
    "Justice pays. Somehow.",
    "The stock market appreciates brooding.",
    "Wayne Aerospace sold satellite parts to Wayne Biotech.",
    "Dividends paid out in matte black carbon vouchers.",
    "Bruce accidentally bought an entire steel refinery.",
    "Applied R&D budget write-off: 'Experimental Batarang Paint'."
  ];

  const response = {
    currency: "USD",
    balance: baseBalance + change,
    change: `+${change}`,
    message: randomItem(messages)
  };
  res.json(response);
});

module.exports = router;
