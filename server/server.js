const express = require('express');
const cors = require('cors');

const batmanRoutes = require('./routes/batman');
const emergencyRoutes = require('./routes/emergency');
const gothamRoutes = require('./routes/gotham');
const scanRoutes = require('./routes/scan');
const signalRoutes = require('./routes/signal');
const systemRoutes = require('./routes/system');
const uselessRoutes = require('./routes/useless');
const wayneRoutes = require('./routes/wayne');
const weatherRoutes = require('./routes/weather');
const missionsRoutes = require('./routes/missions');
const messagesRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  console.log(`[BATCOMPUTER ${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root & Health
app.get('/', (req, res) => {
  res.json({
    system: "BATMAN'S BATCOMPUTER � BUT USELESS",
    version: "7.1.0-DARK-KNIGHT",
    status: "ONLINE",
    message: "Crime fighting computing at peak unproductivity."
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: "ONLINE", batcave_link: "SECURE", justice: "PENDING" });
});

// Mount Routes
app.use('/api/batman', batmanRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/gotham', gothamRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/signal', signalRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/useless', uselessRoutes);
app.use('/api/wayne', wayneRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/missions', missionsRoutes);
app.use('/api/messages', messagesRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({
    error: "404_DARK_ALLEY_NOT_FOUND",
    message: "Even the Batcomputer cannot locate what you are looking for.",
    suggestion: "Brood on it."
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[BATCOMPUTER_ALERT]', err);
  res.status(500).json({
    error: "BATCAVE_CORE_GLITCH",
    message: "An internal dramatic incident occurred.",
    details: err.message
  });
});

if (require.main === module || process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`  BATCOMPUTER TACTICAL MAINFRAME ONLINE `);
    console.log(`  Listening on http://localhost:${PORT} `);
    console.log(`========================================`);
  });
}

module.exports = app;
