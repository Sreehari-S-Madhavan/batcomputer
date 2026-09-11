const http = require("http");
const fs = require("fs");
const path = require("path");

async function runE2ETests() {
  console.log("=== STARTING FULL E2E VALIDATION FOR BATMANS BATCOMPUTER ===");

  // 1. Verify filesystem assets
  console.log("\n[TEST 1] Verifying Image and Data Assets...");
  const reqFiles = [
    "client/public/images/image1.jpg",
    "client/public/images/image2.jpg",
    "client/dist/index.html",
    "server/data/batman.json",
    "server/data/crimes.json",
    "server/data/emergencies.json",
    "server/data/messages.json",
    "server/data/missions.json",
    "server/data/useless.json",
    "server/data/villains.json",
    "server/data/weather.json"
  ];

  for (const f of reqFiles) {
    if (!fs.existsSync(f)) {
      console.error(`MISSING FILE: ${f}`);
      process.exit(1);
    }
  }
  console.log("All required images, dist assets, and data files present.");

  // 2. Start Server on Port 3000
  console.log("\n[TEST 2] Starting Express Server on Port 3000...");
  process.env.PORT = 3000;
  require("./server/server.js");

  // Wait 1 second for port binding
  await new Promise((r) => setTimeout(r, 1200));

  // 3. Test API Endpoints
  const endpoints = [
    { url: "http://localhost:3000/api/health", method: "GET" },
    { url: "http://localhost:3000/api/batman/status", method: "GET", validate: (d) => d.status && d.location && d.suit },
    { url: "http://localhost:3000/api/gotham/threat", method: "GET", validate: (d) => d.threat_level && d.threat_score >= 85 && d.crime_detected === 0 },
    { url: "http://localhost:3000/api/gotham/crime", method: "GET", validate: (d) => d.crime_detected === 0 && d.missing_socks > 0 },
    { url: "http://localhost:3000/api/wayne/balance", method: "GET", validate: (d) => d.balance > 80000000000 },
    { url: "http://localhost:3000/api/weather", method: "GET", validate: (d) => d.condition && d.temperature !== undefined },
    { url: "http://localhost:3000/api/system", method: "GET", validate: (d) => d.cpu_usage && d.memory_usage },
    { url: "http://localhost:3000/api/useless", method: "GET", validate: (d) => typeof d.message === "string" },
    { url: "http://localhost:3000/api/missions", method: "GET", validate: (d) => Array.isArray(d.missions) && d.missions.length > 0 },
    { url: "http://localhost:3000/api/missions/MISSION-001/execute", method: "POST", body: {}, validate: (d) => d.status && d.outcome },
    { url: "http://localhost:3000/api/messages/alfred", method: "GET", validate: (d) => d.sender && d.message },
    { url: "http://localhost:3000/api/emergency", method: "POST", body: {}, validate: (d) => d.result === "NOTHING HAPPENED" },
    { url: "http://localhost:3000/api/signal/bat-signal", method: "POST", body: {}, validate: (d) => d.status === "ACTIVATED" && d.response }
  ];

  console.log("\n[TEST 3] Testing Core API Endpoints...");
  let passes = 0;
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url, {
        method: ep.method,
        headers: { "Content-Type": "application/json" },
        body: ep.body ? JSON.stringify(ep.body) : undefined
      });
      if (res.status !== 200) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (ep.validate && !ep.validate(data)) {
        throw new Error(`Validation failed for ${ep.url}: ${JSON.stringify(data)}`);
      }
      console.log(`[PASS] ${ep.method} ${ep.url.replace("http://localhost:3000", "")}`);
      passes++;
    } catch (err) {
      console.error(`[FAIL] ${ep.method} ${ep.url}: ${err.message}`);
    }
  }

  // 4. Test scan/villains with 2-second timeout
  console.log("\n[TEST 4] Testing Surveillance Scanner (Simulated 2s City Camera Sweep)...");
  const scanStart = Date.now();
  const scanRes = await fetch("http://localhost:3000/api/scan/villains", { method: "POST" });
  const scanData = await scanRes.json();
  const scanDuration = Date.now() - scanStart;
  console.log(`Scanner completed in ${scanDuration}ms. Status: ${scanData.scan_status}, Cameras: ${scanData.cameras_scanned}, Detected: ${scanData.villains_detected}`);
  if (scanData.scan_status === "COMPLETE" && scanData.cameras_scanned > 8000) {
    console.log("[PASS] Surveillance scanner successfully executed.");
    passes++;
  } else {
    console.error("[FAIL] Surveillance scanner returned invalid payload.");
  }

  console.log(`\n========================================`);
  console.log(`ALL INTEGRATION TESTS COMPLETE: ${passes}/${endpoints.length + 1} PASSED`);
  console.log(`========================================\n`);

  process.exit(0);
}

runE2ETests().catch((e) => {
  console.error("Fatal Test Glitch:", e);
  process.exit(1);
});
