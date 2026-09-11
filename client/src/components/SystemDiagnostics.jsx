import React from "react";
import { CpuIcon, RefreshCwIcon } from "./Icons";
import { playTacticalChirp } from "../utils/sound";

export const SystemDiagnostics = ({ data, uselessIntel, onRefresh }) => {
  const cpuVal = data?.cpu_usage || "99%";
  const memoryVal = data?.memory_usage || "78%";

  return (
    <div className="tactical-panel system-diagnostics-panel">
      <div className="panel-header">
        <div className="panel-title">
          <CpuIcon size={16} /> BATCOMPUTER MAINFRAME TELEMETRY
        </div>
        <div className="panel-tag">CORE v7.1.0</div>
      </div>

      <div className="panel-content">
        <div className="diagnostics-grid">
          <div className="diag-gauge-card">
            <span className="diag-card-title">PROCESSOR LOAD</span>
            <div className="diag-big-val mono-val highlight-amber">{cpuVal}</div>
            <span className="diag-subtext mono-val text-muted">
              REASON: {data?.reason || "Rendering unnecessary bat animations"}
            </span>
          </div>

          <div className="diag-gauge-card">
            <span className="diag-card-title">NEURAL RAM ALLOCATION</span>
            <div className="diag-big-val mono-val text-cyan">{memoryVal}</div>
            <span className="diag-subtext mono-val text-muted">
              ALL WEATHER GLOOM BUFFERS FILLED
            </span>
          </div>
        </div>

        <div className="telemetry-rows">
          <div className="telemetry-row">
            <span className="tel-key">ENCRYPTION STATUS:</span>
            <span className="tel-val mono-val highlight-cyan">
              {data?.security || "Batman secure"}
            </span>
          </div>
          <div className="telemetry-row">
            <span className="tel-key">ALFRED STATUS:</span>
            <span className="tel-val mono-val text-amber">
              {data?.alfred_status || "Making tea"}
            </span>
          </div>
          <div className="telemetry-row">
            <span className="tel-key">TACTICAL SYSTEM INTEGRITY:</span>
            <span className="tel-val mono-val text-green">100% OPERATIONAL (0% USEFUL)</span>
          </div>
        </div>

        {/* Useless Intel Ticker */}
        <div className="useless-intel-banner">
          <div className="intel-ticker-label mono-val">&gt; LIVE SYSTEM THOUGHT:</div>
          <div className="intel-ticker-content mono-val pulse-cyan">
            "{uselessIntel || "Calculating Batman's dramatic entrance angle... Purpose not found."}"
          </div>
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
            <RefreshCwIcon size={12} /> RESTART COGNITIVE CORES
          </button>
        </div>
      </div>
    </div>
  );
};
