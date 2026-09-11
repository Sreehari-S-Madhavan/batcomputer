import React, { useState } from "react";
import { CrosshairIcon, EyeIcon, RefreshCwIcon } from "./Icons";
import { triggerVillainScan } from "../services/api";
import { playBeep, playRadarPing, playTacticalChirp } from "../utils/sound";

export const VillainScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    setProgress(0);
    playRadarPing();

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        playBeep(800 + prev * 8, 0.04);
        return prev + 15;
      });
    }, 250);

    try {
      const data = await triggerVillainScan();
      clearInterval(progressTimer);
      setProgress(100);
      setScanResult(data);
      playTacticalChirp();
    } catch {
      clearInterval(progressTimer);
      setScanResult({
        scan_status: "COMPLETE",
        cameras_scanned: 8492,
        arkham_checked: true,
        villains_detected: 1,
        villain: {
          name: "Suspicious Man",
          threat: "3%",
          crime: "Wearing sunglasses at night"
        },
        message: "Gotham is suspiciously peaceful."
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="tactical-panel villain-scanner-panel">
      <div className="panel-header">
        <div className="panel-title">
          <CrosshairIcon size={16} /> GOTHAM CITIZEN & SURVEILLANCE SCANNER
        </div>
        <div className="panel-tag">CCTV LINK: 8,400+ FEEDS</div>
      </div>

      <div className="panel-content">
        <p className="scanner-intro">
          Run deep facial recognition across Gotham traffic cameras, alleys, and rooftops to detect suspicious individuals.
        </p>

        {isScanning && (
          <div className="scan-in-progress-box">
            <div className="scan-hud-grid">
              <div className="scanner-sweep-line" />
              <div className="scanner-target-reticle">
                <CrosshairIcon size={40} className="pulse-cyan" />
              </div>
            </div>
            <div className="scan-progress-label mono-val">
              SCANNING GOTHAM INFRASTRUCTURE: {progress}%
            </div>
            <div className="scan-meter-track">
              <div className="scan-meter-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="mono-val text-muted text-small">
              CROSS-REFERENCING ARKHAM ASYLUM INMATE DATABASE...
            </span>
          </div>
        )}

        {!isScanning && !scanResult && (
          <div className="scanner-standby-view">
            <div className="standby-icon-box">
              <EyeIcon size={48} className="text-muted pulse-cyan" />
            </div>
            <span className="mono-val text-muted">
              CAMERAS READY: 8,412 // SCANNER IN STANDBY
            </span>
          </div>
        )}

        {!isScanning && scanResult && (
          <div className="scan-result-card">
            <div className="result-header">
              <span className="result-badge mono-val">STATUS: {scanResult.scan_status}</span>
              <span className="cameras-badge mono-val">
                {scanResult.cameras_scanned} FEEDS ANALYZED
              </span>
            </div>

            {scanResult.villains_detected === 0 ? (
              <div className="result-clean">
                <div className="clean-title text-cyan">RESULT: NO THREATS FOUND</div>
                <div className="clean-desc mono-val">
                  "{scanResult.message || "Gotham is suspiciously peaceful."}"
                </div>
                <span className="text-muted text-small">
                  Batman suspects the pigeons are hiding something.
                </span>
              </div>
            ) : (
              <div className="result-villain-found">
                <div className="villain-alert-title text-crimson">
                  TACTICAL MATCH IDENTIFIED!
                </div>
                <div className="villain-card">
                  <div className="villain-name mono-val">
                    SUSPECT: <span className="highlight-amber">{scanResult.villain?.name}</span>
                  </div>
                  <div className="villain-threat mono-val">
                    THREAT LEVEL: <span className="text-crimson">{scanResult.villain?.threat}</span>
                  </div>
                  <div className="villain-crime mono-val">
                    SUSPICIOUS ACT: <span className="text-cyan">"{scanResult.villain?.crime}"</span>
                  </div>
                </div>
                <span className="text-muted text-small mono-val">
                  &gt; Recommended Response: Brood aggressively from gargoyle.
                </span>
              </div>
            )}
          </div>
        )}

        <div className="panel-footer-actions">
          <button
            type="button"
            className="tactical-btn"
            onClick={handleStartScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <RefreshCwIcon size={12} className="spin-animation" /> SCANNING CITY...
              </>
            ) : (
              <>
                <CrosshairIcon size={14} /> SCAN GOTHAM FOR VILLAINS
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
