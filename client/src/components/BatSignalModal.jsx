import React, { useState } from "react";
import { ArkhamBatInsignia, RadioIcon } from "./Icons";
import { triggerBatSignal } from "../services/api";
import { playBeep, playRadarPing, playSearchlightIgnition } from "../utils/sound";

export const BatSignalModal = ({ isOpen, onClose }) => {
  const [activating, setActivating] = useState(false);
  const [signalActive, setSignalActive] = useState(false);
  const [signalResult, setSignalResult] = useState(null);
  const [sector, setSector] = useState("GCPD HQ ROOFTOP");
  const [intensity, setIntensity] = useState("MAXIMUM");

  if (!isOpen) return null;

  const sectors = [
    "GCPD HQ ROOFTOP",
    "MONARCH THEATER (BLEAKE ISLAND)",
    "FOUNDERS ISLAND SKYLINE",
    "ACE CHEMICALS OVERLOOK",
    "ARKHAM ASYLUM CLOUD DECK"
  ];

  const handleIgniteSignal = async () => {
    setActivating(true);
    playSearchlightIgnition();
    try {
      const data = await triggerBatSignal();
      setSignalActive(true);
      setSignalResult(data);
      playRadarPing();
    } catch {
      setSignalActive(true);
      setSignalResult({
        status: "ACTIVATED",
        signal: "ON",
        response: "Nobody came.",
        reason: "Batman was already on the gargoyle directly behind the projector."
      });
    } finally {
      setActivating(false);
    }
  };

  const handleDeactivate = () => {
    setSignalActive(false);
    setSignalResult(null);
    playBeep(240, 0.15, "sawtooth");
  };

  return (
    <div className="modal-backdrop">
      <div className="bat-signal-modal arkham-signal-modal tactical-panel">
        <div className="panel-header">
          <div className="panel-title text-amber">
            <RadioIcon size={16} /> GCPD TACTICAL BAT-SIGNAL // ARKHAM KNIGHT PROTOCOL
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            ?
          </button>
        </div>

        <div className="signal-modal-body">
          {/* Target Sector Selection */}
          <div className="projector-controls-bar">
            <div className="projector-control-item">
              <span className="control-label mono-val">TARGET SECTOR:</span>
              <select
                className="tactical-select mono-val"
                value={sector}
                onChange={(e) => {
                  setSector(e.target.value);
                  playBeep(600, 0.04);
                }}
                disabled={activating}
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="projector-control-item">
              <span className="control-label mono-val">ARC INTENSITY:</span>
              <button
                type="button"
                className={`tactical-btn sub-btn ${intensity === "MAXIMUM" ? "amber" : ""}`}
                onClick={() => {
                  setIntensity(intensity === "MAXIMUM" ? "OVERCHARGED" : "MAXIMUM");
                  playBeep(750, 0.04);
                }}
              >
                {intensity} (1.21 GW)
              </button>
            </div>
          </div>

          {/* Realistic Arkham Night Sky Spotlight Projection */}
          <div className={`sky-projection-box arkham-sky-box ${signalActive ? "projecting-on" : ""}`}>
            <div className="arkham-cloud-overlay" />
            <div className="arkham-spotlight-core" />
            <div className="arkham-spotlight-cone" />
            
            {/* The Authentic Arkham Batman Stencil Shadow */}
            <div className="arkham-bat-stencil-wrapper">
              <ArkhamBatInsignia width={160} height={96} className="arkham-emblem-svg" />
            </div>

            {/* Industrial Stencil Markings */}
            <div className="projector-stencil-tag mono-val">
              {signalActive ? `BEACON LOCK: ${sector}` : "SEARCHLIGHT STANDBY // 4,000V CARBON ARC"}
            </div>

            {!signalActive && (
              <div className="sky-offline-label mono-val pulse-cyan">
                [PROJECTOR READY: POINTLESS ACTIVATION STANDBY]
              </div>
            )}
          </div>

          {/* GCPD Hardware Chassis Status */}
          <div className="gcpd-chassis-readout mono-val">
            <span>PROJECTOR: <strong>GCPD-UNIT-54 (ROOFTOP)</strong></span>
            <span>LENS: <strong>FRESNEL 1200mm</strong></span>
            <span>STENCIL: <strong>ARKHAM SPEC TACTICAL STEEL</strong></span>
          </div>

          {signalResult && (
            <div className="signal-result-box arkham-result-box">
              <div className="signal-status-row">
                <span className="mono-val">
                  SYSTEM: <span className="highlight-amber">CARBON-ARC IGNITED</span>
                </span>
                <span className="mono-val">
                  SECTOR: <span className="text-cyan">{sector}</span>
                </span>
              </div>

              <div className="signal-response-box">
                <div className="response-title mono-val">GCPD SURVEILLANCE REPORT:</div>
                <div className="response-text mono-val text-crimson">
                  "{signalResult.response}"
                </div>
                <div className="response-reason mono-val text-muted">
                  &gt; TACTICAL ASSESSMENT: {signalResult.reason}
                </div>
              </div>
            </div>
          )}

          <div className="signal-modal-actions">
            {!signalActive ? (
              <button
                type="button"
                className="tactical-btn amber ignite-btn"
                onClick={handleIgniteSignal}
                disabled={activating}
              >
                {activating ? "CHARGING GCPD CARBON ARCS..." : "IGNITE ARKHAM BAT-SIGNAL"}
              </button>
            ) : (
              <button
                type="button"
                className="tactical-btn"
                onClick={handleDeactivate}
              >
                DISENGAGE SEARCHLIGHT
              </button>
            )}
            <button type="button" className="tactical-btn" onClick={onClose}>
              EXIT CONSOLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
