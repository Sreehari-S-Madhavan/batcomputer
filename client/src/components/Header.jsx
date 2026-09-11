import React, { useState, useEffect } from "react";
import {
  BatLogoIcon,
  Volume2Icon,
  VolumeXIcon,
  AlertTriangleIcon,
  LockIcon,
  EyeIcon,
  RadioIcon
} from "./Icons";
import { isAudioEnabled, toggleAudio, playBeep, playAlarm } from "../utils/sound";

export const Header = ({
  onTriggerEmergency,
  onLogout,
  isBroodMode,
  setIsBroodMode
}) => {
  const [currentTime, setCurrentTime] = useState("");
  const [audioActive, setAudioActive] = useState(isAudioEnabled());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }) + " GOTHAM_EST"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAudioToggle = () => {
    const next = toggleAudio();
    setAudioActive(next);
    if (next) playBeep(980, 0.05);
  };

  const handleBroodToggle = () => {
    setIsBroodMode(!isBroodMode);
    playBeep(330, 0.1, "sawtooth");
  };

  return (
    <header className="bat-header tactical-panel">
      <div className="header-left">
        <div className="bat-brand">
          <div className="bat-logo-wrapper pulse-cyan">
            <BatLogoIcon size={32} />
          </div>
          <div>
            <div className="brand-title">
              BATCOMPUTER <span className="version-pill">v7.1</span>
            </div>
            <div className="brand-subtitle">
              WAYNE INTELLIGENCE & CRIME PREVENTION TACTICAL CONSOLE
            </div>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="tactical-status-indicator">
          <span className="dot pulse-crimson" />
          <span className="status-text">THREAT: 97% | CRIME: 0</span>
        </div>
        <div className="tactical-clock mono-val">
          <RadioIcon size={14} className="radio-icon pulse-cyan" />
          <span>{currentTime || "00:00:00 GOTHAM_EST"}</span>
        </div>
      </div>

      <div className="header-right">
        <button
          type="button"
          className={`tactical-btn header-btn ${isBroodMode ? "amber" : ""}`}
          onClick={handleBroodToggle}
          title="Toggle Dramatic Brooding Atmosphere"
        >
          <EyeIcon size={14} />
          <span>{isBroodMode ? "BROOD: MAX" : "BROOD MODE"}</span>
        </button>

        <button
          type="button"
          className="tactical-btn header-btn"
          onClick={handleAudioToggle}
          title={audioActive ? "Mute Tactical Audio" : "Unmute Tactical Audio"}
        >
          {audioActive ? <Volume2Icon size={14} /> : <VolumeXIcon size={14} />}
          <span>{audioActive ? "AUDIO ON" : "MUTED"}</span>
        </button>

        <button
          type="button"
          className="tactical-btn danger header-btn"
          onClick={() => {
            playAlarm();
            onTriggerEmergency();
          }}
          title="Trigger Wayne Defcon Red Alert Protocol"
        >
          <AlertTriangleIcon size={14} />
          <span>RED ALERT</span>
        </button>

        <button
          type="button"
          className="tactical-btn header-btn lock-btn"
          onClick={() => {
            playBeep(400, 0.1);
            onLogout();
          }}
          title="Lock Console & Disconnect Terminal"
        >
          <LockIcon size={14} />
          <span>LOCK</span>
        </button>
      </div>
    </header>
  );
};
