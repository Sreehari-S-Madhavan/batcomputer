import React, { useState } from "react";
import { ActivityIcon, RefreshCwIcon, BatLogoIcon } from "./Icons";
import { playBeep, playTacticalChirp } from "../utils/sound";

export const BatmanStatus = ({ data, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    playTacticalChirp();
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const handleBroodMore = () => {
    playBeep(220, 0.15, "triangle");
  };

  const energyLevel = data?.energy || 85;

  return (
    <div className="tactical-panel batman-status-panel">
      <div className="panel-header">
        <div className="panel-title">
          <ActivityIcon size={16} /> BATMAN BIOMETRIC & OPERATIONAL STATUS
        </div>
        <div className="panel-tag">VITALS: DRAMATIC</div>
      </div>

      <div className="panel-content">
        <div className="bat-profile-row">
          <div className="bat-avatar-box">
            <BatLogoIcon size={44} className="avatar-icon pulse-cyan" />
            <span className="avatar-label">BRUCE // 01</span>
          </div>

          <div className="bat-details-grid">
            <div className="detail-item">
              <span className="detail-key">TACTICAL STATUS:</span>
              <span className="detail-value highlight-cyan mono-val">
                {data?.status || "BROODING"}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-key">CURRENT LOCATION:</span>
              <span className="detail-value mono-val">
                {data?.location || "Standing dramatically on a gargoyle"}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-key">EQUIPPED SUIT:</span>
              <span className="detail-value mono-val">{data?.suit || "Mark 9000"}</span>
            </div>

            <div className="detail-item">
              <span className="detail-key">PSYCHOLOGICAL MOOD:</span>
              <span className="detail-value mono-val text-amber">
                {data?.mood || "Contemplative"}
              </span>
            </div>
          </div>
        </div>

        {/* Energy bar */}
        <div className="energy-container">
          <div className="energy-header">
            <span className="energy-label">TACTICAL ENERGY RESERVE</span>
            <span className="energy-val mono-val">{energyLevel}%</span>
          </div>
          <div className="energy-track">
            <div
              className="energy-fill"
              style={{
                width: `${energyLevel}%`,
                background:
                  energyLevel > 50
                    ? "linear-gradient(90deg, #00f0ff, #00ff88)"
                    : "linear-gradient(90deg, #ffb700, #ff1e44)"
              }}
            />
          </div>
        </div>

        {/* Current Pointless Activity */}
        <div className="current-activity-box">
          <div className="activity-title">CURRENT MISSION OBJECTIVE:</div>
          <div className="activity-desc mono-val">
            &gt; {data?.current_activity || "Staring dramatically into the distance"}
          </div>
        </div>

        <div className="panel-footer-actions">
          <button
            type="button"
            className="tactical-btn"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCwIcon size={12} className={isRefreshing ? "spin-animation" : ""} />
            REFRESH VITALS
          </button>
          <button
            type="button"
            className="tactical-btn amber"
            onClick={handleBroodMore}
          >
            INTENSIFY BROODING
          </button>
        </div>
      </div>
    </div>
  );
};
