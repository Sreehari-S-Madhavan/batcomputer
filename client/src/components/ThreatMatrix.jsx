import React from "react";
import { ShieldAlertIcon, CrosshairIcon, RefreshCwIcon } from "./Icons";
import { playTacticalChirp } from "../utils/sound";

export const ThreatMatrix = ({ threatData, crimeData, onRefresh }) => {
  const threatScore = threatData?.threat_score || 97;
  const threatLevel = threatData?.threat_level || "EXTREME";
  const reason = threatData?.reason || "Batman feels something in the wind";

  const crimeItems = [
    { label: "ARMED ROBBERIES", count: crimeData?.robberies ?? 0, highlight: false },
    { label: "SUPERVILLAIN CRIMES", count: crimeData?.villains ?? 0, highlight: false },
    { label: "STOLEN PIZZAS", count: crimeData?.stolen_pizzas ?? 0, highlight: false },
    { label: "SUSPICIOUS PIGEONS", count: crimeData?.suspicious_pigeons ?? 2, highlight: true },
    { label: "MISSING SOCKS", count: crimeData?.missing_socks ?? 47, highlight: true },
    { label: "BAD PARKING IN GOTHAM", count: crimeData?.bad_parking ?? 23, highlight: true },
    { label: "LATE NIGHT SNACKING", count: crimeData?.late_night_snacking ?? 156, highlight: true },
    { label: "SUSPICIOUS UMBRELLAS", count: crimeData?.suspicious_umbrella_usage ?? 12, highlight: true },
    { label: "OVERLY DRAMATIC POSING", count: crimeData?.overly_dramatic_posing ?? 4, highlight: true },
    { label: "SLOW SIDEWALK WALKERS", count: crimeData?.slow_walking ?? 89, highlight: true },
    { label: "PUBLIC HUMMING INCIDENTS", count: crimeData?.public_humming ?? 34, highlight: true }
  ];

  return (
    <div className="tactical-panel threat-matrix-panel">
      <div className="panel-header">
        <div className="panel-title text-crimson">
          <ShieldAlertIcon size={16} className="pulse-crimson" /> GOTHAM THREAT & CRIME MATRIX
        </div>
        <div className="panel-tag danger">STATUS: CRITICAL CALM</div>
      </div>

      <div className="panel-content">
        {/* Massive Paradox Indicator */}
        <div className="threat-paradox-row">
          <div className="paradox-box threat-box">
            <span className="box-title">THREAT LEVEL</span>
            <div className="box-number pulse-crimson mono-val">{threatScore}%</div>
            <span className="box-tag text-crimson">{threatLevel}</span>
          </div>

          <div className="paradox-divider">
            <CrosshairIcon size={28} className="pulse-cyan" />
            <span className="paradox-vs">VS</span>
          </div>

          <div className="paradox-box crime-box">
            <span className="box-title">CRIME DETECTED</span>
            <div className="box-number text-cyan mono-val">0</div>
            <span className="box-tag text-cyan">PEACE DETECTED</span>
          </div>
        </div>

        {/* Reason for high threat */}
        <div className="threat-reason-bar">
          <span className="reason-label">INTEL ANALYSIS:</span>
          <span className="reason-text mono-val">"{reason}"</span>
        </div>

        {/* Absurd crime metrics grid */}
        <div className="crime-stats-subgrid">
          <div className="crime-subgrid-title">INCIDENT TELEMETRY CLASSIFICATION:</div>
          <div className="crime-cards-list">
            {crimeItems.map((item, idx) => (
              <div key={idx} className={`crime-mini-stat ${item.highlight ? "has-data" : "zero-data"}`}>
                <span className="crime-stat-name">{item.label}</span>
                <span className="crime-stat-val mono-val">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="status-footer-note mono-val">
          &gt; SYSTEM ADVISORY: {crimeData?.status || "Gotham is suspiciously peaceful. Batman remains skeptical."}
        </div>

        <div className="panel-footer-actions">
          <button
            type="button"
            className="tactical-btn"
            onClick={() => {
              playTacticalChirp();
              onRefresh();
            }}
          >
            <RefreshCwIcon size={12} /> RECALCULATE THREAT
          </button>
        </div>
      </div>
    </div>
  );
};
