import React, { useState } from "react";
import { TerminalIcon, RefreshCwIcon } from "./Icons";
import { executeMission } from "../services/api";
import { playBeep, playTacticalChirp } from "../utils/sound";

export const MissionsBoard = ({ missionsData, onRefresh }) => {
  const [executingId, setExecutingId] = useState(null);
  const [lastOutcome, setLastOutcome] = useState(null);

  const missionsList = missionsData?.missions || [];

  const handleExecute = async (mission) => {
    setExecutingId(mission.id);
    playBeep(520, 0.08);
    try {
      const res = await executeMission(mission.id);
      setLastOutcome(res);
      playTacticalChirp();
    } catch {
      setLastOutcome({
        name: mission.name,
        status: "EXTREMELY PENDING",
        outcome: "Mission postponed for dramatic contemplation."
      });
    } finally {
      setExecutingId(null);
    }
  };

  return (
    <div className="tactical-panel missions-board-panel">
      <div className="panel-header">
        <div className="panel-title">
          <TerminalIcon size={16} /> ACTIVE TACTICAL MISSIONS & DIRECTIVES
        </div>
        <div className="panel-tag">DIRECTIVES: {missionsList.length}</div>
      </div>

      <div className="panel-content">
        {lastOutcome && (
          <div className="mission-outcome-alert mono-val">
            <div className="outcome-title text-amber">
              [DIRECTIVE DISPATCH] {lastOutcome.name}
            </div>
            <div className="outcome-text text-cyan">
              &gt; STATUS: {lastOutcome.status} // {lastOutcome.outcome}
            </div>
          </div>
        )}

        <div className="missions-list">
          {missionsList.slice(0, 5).map((m) => (
            <div key={m.id} className="mission-item-card">
              <div className="mission-item-header">
                <span className="mission-id mono-val">{m.id}</span>
                <span className="mission-name">{m.name}</span>
                <span
                  className={`mission-priority-tag mono-val ${
                    m.priority === "CRITICAL"
                      ? "priority-crit"
                      : m.priority === "HIGH"
                      ? "priority-high"
                      : "priority-norm"
                  }`}
                >
                  {m.priority}
                </span>
              </div>

              <div className="mission-item-desc mono-val text-muted">
                {m.description}
              </div>

              <div className="mission-item-footer">
                <span className="mission-status-pill mono-val">
                  STATUS: {m.status}
                </span>
                <button
                  type="button"
                  className="tactical-btn sub-btn"
                  onClick={() => handleExecute(m)}
                  disabled={executingId === m.id}
                >
                  {executingId === m.id ? "POSTPONING..." : "EXECUTE"}
                </button>
              </div>
            </div>
          ))}
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
            <RefreshCwIcon size={12} /> RE-EVALUATE DIRECTIVES
          </button>
        </div>
      </div>
    </div>
  );
};
