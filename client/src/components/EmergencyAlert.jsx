import React, { useState, useEffect } from "react";
import { AlertTriangleIcon } from "./Icons";
import { triggerEmergencyProtocol } from "../services/api";
import { playAlarm, playBeep } from "../utils/sound";

export const EmergencyAlert = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    playAlarm();
    let isMounted = true;
    triggerEmergencyProtocol()
      .then((data) => {
        if (isMounted) {
          setAlertData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAlertData({
            status: "ACTIVATED",
            protocol: "EMERGENCY",
            result: "NOTHING HAPPENED",
            message: "Alfred is on vacation. Batmobile is still parked.",
            batmobile: "Still parked.",
            gotham: "Completely fine."
          });
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop emergency-overlay">
      <div className="emergency-box tactical-panel danger screen-shake">
        <div className="emergency-header">
          <div className="defcon-badge">DEFCON 1 // GOTHAM PROTOCOL</div>
          <AlertTriangleIcon size={36} className="pulse-crimson" />
          <h2 className="emergency-title pulse-crimson">TACTICAL EMERGENCY ACTIVATED</h2>
        </div>

        <div className="emergency-body">
          {loading ? (
            <div className="emergency-loading mono-val">
              <span className="pulse-crimson">DISPATCHING BATCAVE DEFENSE SUBSYSTEMS...</span>
            </div>
          ) : (
            <div className="emergency-report">
              <div className="report-status-badge mono-val">
                RESULT: <span className="highlight-amber">{alertData?.result || "NOTHING HAPPENED"}</span>
              </div>

              <div className="report-quote mono-val">
                &gt; "{alertData?.message || "Emergency successfully ignored."}"
              </div>

              <div className="report-subgrid">
                <div className="subgrid-item">
                  <span className="subgrid-key">BATMOBILE TELEMETRY:</span>
                  <span className="subgrid-val mono-val">{alertData?.batmobile || "Still parked."}</span>
                </div>
                <div className="subgrid-item">
                  <span className="subgrid-key">GOTHAM INTEGRITY:</span>
                  <span className="subgrid-val mono-val">{alertData?.gotham || "Completely fine."}</span>
                </div>
              </div>

              <p className="emergency-disclaimer mono-val">
                System Advisory: The Batcomputer has evaluated the situation and concluded that dramatic brooding is more effective than physical intervention.
              </p>
            </div>
          )}
        </div>

        <div className="emergency-footer">
          <button
            type="button"
            className="tactical-btn danger"
            onClick={() => {
              playBeep(440, 0.1);
              onClose();
            }}
          >
            DISMISS FALSE ALARM & RESUME BROODING
          </button>
        </div>
      </div>
    </div>
  );
};
