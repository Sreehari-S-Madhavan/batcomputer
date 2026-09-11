import React from "react";
import { CloudRainIcon, RefreshCwIcon } from "./Icons";
import { playRadarPing } from "../utils/sound";

export const GothamWeather = ({ data, onRefresh }) => {
  return (
    <div className="tactical-panel weather-panel">
      <div className="panel-header">
        <div className="panel-title">
          <CloudRainIcon size={16} /> GOTHAM TACTICAL METEOROLOGY & ATMOSPHERE
        </div>
        <div className="panel-tag">CONDITIONS: NOIR</div>
      </div>

      <div className="panel-content">
        <div className="weather-overview-row">
          <div className="weather-temp-badge">
            <span className="temp-val mono-val">{data?.temperature ?? 11}�{data?.unit || "C"}</span>
            <span className="weather-cond">{data?.condition || "Dramatic Fog"}</span>
          </div>

          <div className="radar-mini-sweep">
            <div className="radar-circle">
              <div className="radar-line" />
              <div className="radar-blip blip-1" />
              <div className="radar-blip blip-2" />
              <div className="radar-blip blip-3" />
            </div>
            <span className="radar-caption mono-val">GOTHAM DOPPLER</span>
          </div>
        </div>

        <div className="weather-metrics-grid">
          <div className="metric-box">
            <span className="metric-label">VISIBILITY INDEX:</span>
            <span className="metric-value mono-val text-cyan">{data?.visibility || "Dramatic"}</span>
          </div>
          <div className="metric-box">
            <span className="metric-label">ATMOSPHERIC GLOOM:</span>
            <span className="metric-value mono-val text-amber">{data?.humidity ?? 88}%</span>
          </div>
          <div className="metric-box">
            <span className="metric-label">CAPE FLUTTER FACTOR:</span>
            <span className="metric-value mono-val">9.4 / 10 OPTIMAL</span>
          </div>
          <div className="metric-box">
            <span className="metric-label">BROODING SUITABILITY:</span>
            <span className="metric-value mono-val text-green">100% MAXIMUM</span>
          </div>
        </div>

        <div className="weather-advisory-bar mono-val">
          &gt; METEOROLOGICAL DIRECTIVE: "{data?.message || "Perfect weather for a dramatic rooftop entrance."}"
        </div>

        <div className="panel-footer-actions">
          <button
            type="button"
            className="tactical-btn"
            onClick={() => {
              playRadarPing();
              onRefresh();
            }}
          >
            <RefreshCwIcon size={12} /> SCAN CLOUD COVER
          </button>
        </div>
      </div>
    </div>
  );
};
