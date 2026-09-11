import React, { useState } from "react";
import { BatLogoIcon, EyeIcon } from "./Icons";
import { playAccessGranted, playBeep, playTypingClick } from "../utils/sound";

export const LoginScreen = ({ onLoginSuccess }) => {
  const [passcode, setPasscode] = useState("");
  const [scanningState, setScanningState] = useState("IDLE"); // IDLE, SCANNING, GRANTED, ERROR
  const [scanProgress, setScanProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([
    "INITIALIZING WAYNE ENTERPRISES SECURE SATELLITE LINK...",
    "BATCAVE MAINFRAME ENCRYPTION: 4096-BIT RSA TACTICAL",
    "ENTER ACCESS PROTOCOL OR INITIATE RETINAL BIOMETRIC VERIFICATION."
  ]);

  const addLog = (msg) => {
    setTerminalLogs((prev) => [...prev.slice(-6), msg]);
  };

  const handleBiometricScan = () => {
    setScanningState("SCANNING");
    setScanProgress(10);
    playBeep(440, 0.1);
    addLog("ENGAGING THERMAL RETINAL SENSOR...");

    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      setScanProgress(progress);
      playBeep(600 + progress * 6, 0.05);

      if (progress === 50) {
        addLog("SCANNING CORNEAL PATTERN: MATCHING BRUCE WAYNE...");
      } else if (progress === 90) {
        addLog("VOICE PRINT HARMONICS: RECOGNIZED (BROODING TONE: 99.4%)");
      } else if (progress >= 100) {
        clearInterval(interval);
        setScanningState("GRANTED");
        addLog("BIOMETRIC MATCH CONFIRMED. WELCOME BACK, SIR.");
        playAccessGranted();
        setTimeout(() => {
          onLoginSuccess();
        }, 1200);
      }
    }, 350);
  };

  const handleBypass = () => {
    playTypingClick();
    addLog("OVERRIDE CODE ACCEPTED: [ALFRED_TEA_EXTRA_SUGAR]");
    setScanningState("GRANTED");
    playAccessGranted();
    setTimeout(() => {
      onLoginSuccess();
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      addLog("PASSCODE CANNOT BE EMPTY. EVEN BATMAN ENTERS A KEY.");
      playBeep(200, 0.2, "sawtooth");
      return;
    }
    // Accept anything because Batcomputer humorously authenticates anyway!
    addLog(`ANALYZING PROTOCOL "${passcode.toUpperCase()}"...`);
    setScanningState("SCANNING");
    setScanProgress(40);
    setTimeout(() => {
      setScanProgress(100);
      setScanningState("GRANTED");
      addLog(`AUTHORIZED. REASON: "CLOSE ENOUGH TO JUSTICE".`);
      playAccessGranted();
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-backdrop-image" />
      <div className="login-scanline" />

      <div className="login-modal tactical-panel">
        <div className="login-header">
          <div className="login-badge">
            <BatLogoIcon size={38} className="bat-icon-glow pulse-cyan" />
            <div>
              <h1 className="login-title">BATCOMPUTER v7.1</h1>
              <span className="login-subtitle">WAYNE SECURE DEFENSE MAINFRAME</span>
            </div>
          </div>
          <div className="clearance-tag">ALPHA CLEARANCE REQUIRED</div>
        </div>

        {/* Retinal scanner animation visual */}
        <div className="retina-scanner-zone">
          <div className={`retina-circle ${scanningState === "SCANNING" ? "scanning-active" : ""}`}>
            <div className="retina-crosshair">
              <EyeIcon size={32} className="eye-icon" />
            </div>
            <div className="scanner-beam" />
          </div>

          <div className="scanner-status">
            {scanningState === "IDLE" && (
              <span className="status-idle">OPTICAL / BIOMETRIC SENSORS STANDBY</span>
            )}
            {scanningState === "SCANNING" && (
              <span className="status-scanning pulse-cyan">
                SCANNING RETINA & BROODING FREQUENCY: {scanProgress}%
              </span>
            )}
            {scanningState === "GRANTED" && (
              <span className="status-granted">
                IDENTIFIED: BRUCE WAYNE // ACCESS AUTHORIZED
              </span>
            )}
          </div>
        </div>

        {/* Quick biometric scan button */}
        <div className="login-actions">
          <button
            type="button"
            className="tactical-btn login-btn-scan"
            onClick={handleBiometricScan}
            disabled={scanningState === "SCANNING" || scanningState === "GRANTED"}
          >
            <EyeIcon size={16} /> INITIATE RETINAL SCAN
          </button>
        </div>

        <div className="divider-or">
          <span>OR ENTER ACCESS CODE</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <span className="input-prefix">PASSCODE_</span>
            <input
              type="password"
              placeholder="e.g. I_AM_THE_NIGHT"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                playTypingClick();
              }}
              className="tactical-input"
              disabled={scanningState === "SCANNING" || scanningState === "GRANTED"}
            />
            <button
              type="submit"
              className="tactical-btn"
              disabled={scanningState === "SCANNING" || scanningState === "GRANTED"}
            >
              AUTHENTICATE
            </button>
          </div>
        </form>

        <div className="login-bypass-row">
          <button
            type="button"
            className="bypass-link"
            onClick={handleBypass}
          >
            [ ALFRED EMERGENCY OVERRIDE ]
          </button>
          <span className="useless-hint">Tip: Batman never forgets his password, but Alfred wrote it on a post-it.</span>
        </div>

        {/* Mini terminal readout at bottom of login */}
        <div className="login-terminal">
          <div className="login-term-bar">TERMINAL LOG</div>
          {terminalLogs.map((log, index) => (
            <div key={index} className="term-line">
              &gt; {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
