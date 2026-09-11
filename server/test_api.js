const http = require('http');

// Start server on port 3001 for automated test
process.env.PORT = 3001;
require('./server.js');

setTimeout(async () => {
  const endpoints = [
    { path: '/', method: 'GET' },
    { path: '/api/health', method: 'GET' },
    { path: '/api/batman/status', method: 'GET' },
    { path: '/api/gotham/threat', method: 'GET' },
    { path: '/api/gotham/crime', method: 'GET' },
    { path: '/api/system', method: 'GET' },
    { path: '/api/useless', method: 'GET' },
    { path: '/api/wayne/balance', method: 'GET' },
    { path: '/api/weather', method: 'GET' },
    { path: '/api/missions', method: 'GET' },
    { path: '/api/messages/alfred', method: 'GET' },
    { path: '/api/messages/system', method: 'GET' },
    { path: '/api/emergency', method: 'POST', body: {} },
    { path: '/api/signal/bat-signal', method: 'POST', body: {} }
  ];

  console.log('Testing endpoints...');
  let passed = 0;
  for (const ep of endpoints) {
    try {
      const res = await fetch(`http://localhost:3001${ep.path}`, {
        method: ep.method,
        headers: { 'Content-Type': 'application/json' },
        body: ep.body ? JSON.stringify(ep.body) : undefined
      });
      const data = await res.json();
      if (res.status === 200) {
        console.log(`[PASS] ${ep.method} ${ep.path} =>`, JSON.stringify(data).slice(0, 60) + '...');
        passed++;
      } else {
        console.error(`[FAIL] ${ep.method} ${ep.path} Status: ${res.status}`);
      }
    } catch (err) {
      console.error(`[ERROR] ${ep.method} ${ep.path}`, err.message);
    }
  }

  console.log(`\nEndpoints Tested: ${passed}/${endpoints.length} passed.`);
  process.exit(passed === endpoints.length ? 0 : 1);
}, 1000);
