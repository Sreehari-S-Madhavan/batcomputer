# BATMAN'S BATCOMPUTER � BUT USELESS

> "Extremely serious Batman-style tactical computer interface + completely useless information and actions."

An ultra-detailed, cinematic Batcave tactical mainframe built with React, Vite, Node.js, Express, and pure Web Audio SFX synthesis.

---

## Quick Start

### 1. Start the Backend API (Port 3000)
```bash
cd server
npm install
npm start
```
*API runs on http://localhost:3000*

### 2. Start the Frontend HUD (Port 5173)
In another terminal:
```bash
cd client
npm install
npm run dev
```
*HUD runs on http://localhost:5173*

## Deploy to Vercel

Import the repository into Vercel with the project root set to the repository root. The included `vercel.json` builds the Vite client from `client/`, serves it from `client/dist`, and routes `/api/*` to the Express serverless function in `api/index.js`.

No environment variables are required.

---

## Automated Verification & Testing
To run the automated end-to-end integration test suite:
```bash
node test_e2e.js
```
To run the frontend production build and linter:
```bash
cd client
npm run build
npm run lint
```

---

## Tactical Features
- **Biometric Retinal Scan Access**: Secure Wayne Enterprises Alpha Clearance terminal with thermal retinal sensor and Alfred emergency bypass.
- **Biometric & Psychological Vitals**: Suit diagnostics (Mark 9000), Energy reserve, Mood ("Contemplative", "Emotionally unavailable"), Pointless activities ("Staring dramatically into the distance").
- **Gotham Threat vs. Crime Matrix**: Threat Level: EXTREME (97%) vs. Crime Detected: 0. Telemetry classification for missing socks, suspicious pigeons, bad parking, and late-night snacking.
- **Wayne Enterprises Financial Ticker**: Real-time ticker with billions in liquid capital ("Bruce made money while brooding") and tactical expense simulations.
- **Gotham Noir Weather & Doppler Radar**: Live weather conditions with animated radar sweep, fog/rain advisories, and dramatic cape flutter coefficients.
- **Citizen & Villain Surveillance Scanner**: Interactive city sweep across 8,400+ CCTV feeds with 2-second tactical sweep animation and suspect profiling ("Man with Umbrella - having an umbrella when it's not raining").
- **Rooftop Bat-Signal Beacon**: Sky projection beam with bat-symbol illumination and response outcome ("Nobody came. Batman was already here.").
- **DEFCON 1 Red Alert**: Emergency klaxon alarm, screen shake, and automated useless response ("NOTHING HAPPENED - Alfred is on vacation.").
- **Encrypted Manor Butler Feed**: Pennyworth direct intercom, tea requests, and butler guidance.
- **Batcave Command Prompt (CLI)**: Interactive tactical terminal supporting directives (`help`, `brood`, `coffee`, `scan`, `signal`, `emergency`, `alfred`, `justice`, `clear`).
- **Vital Brooding & Caffeine Gauges**: Coffee level critical monitor and brooding intensity tuner.
- **Tactical Audio Synthesizer**: Pure Web Audio API sound effects (chirps, sonar pings, alarms, typing clicks) with mute toggle.
- **Dramatic Brooding Atmosphere**: High-contrast noir brooding mode toggle.
