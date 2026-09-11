import React, { useState } from "react";
import { CoffeeIcon } from "./Icons";
import { playBeep, playTacticalChirp } from "../utils/sound";

export const CoffeeAndBroodMeter = () => {
  const [coffeeLevel, setCoffeeLevel] = useState(4);
  const [broodDepth, setBroodDepth] = useState(99);
  const [alertText, setAlertText] = useState("");

  const handleBrewCoffee = () => {
    playTacticalChirp();
    setCoffeeLevel(100);
    setAlertText("Alfred brewed Dark Roast Noir. Batman stared at it for 2 hours.");
    setTimeout(() => setAlertText(""), 4000);
  };

  const handleBroodMore = () => {
    playBeep(180, 0.15, "sawtooth");
    setBroodDepth((prev) => Math.min(100, prev + 1));
    setAlertText("Batman turned dramatically toward the window. Lightning flashed conveniently.");
    setTimeout(() => setAlertText(""), 4000);
  };

  return (
    <div className="tactical-panel coffee-brood-panel">
      <div className="panel-header">
        <div className="panel-title text-amber">
          <CoffeeIcon size={16} /> VITAL BROODING & CAFFEINE TELEMETRY
        </div>
        <div className="panel-tag amber">CRITICAL SENSORS</div>
      </div>

      <div className="panel-content">
        <div className="meters-grid">
          {/* Coffee Gauge */}
          <div className="meter-card">
            <div className="meter-header">
              <span className="meter-name">BATMAN COFFEE LEVEL</span>
              <span className={`meter-val mono-val ${coffeeLevel < 20 ? "text-crimson pulse-crimson" : "text-green"}`}>
                {coffeeLevel}% {coffeeLevel < 20 ? "(CRITICAL)" : "(OPTIMAL)"}
              </span>
            </div>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{
                  width: `${coffeeLevel}%`,
                  background: coffeeLevel < 20 ? "var(--bat-crimson)" : "var(--bat-amber)"
                }}
              />
            </div>
            <div className="meter-actions">
              <button
                type="button"
                className="tactical-btn sub-btn"
                onClick={handleBrewCoffee}
              >
                BREW ALFRED'S BLEND
              </button>
            </div>
          </div>

          {/* Brooding Gauge */}
          <div className="meter-card">
            <div className="meter-header">
              <span className="meter-name">BROODING INTENSITY</span>
              <span className="meter-val mono-val highlight-cyan">
                {broodDepth}.8% (MAX)
              </span>
            </div>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{
                  width: `${broodDepth}%`,
                  background: "linear-gradient(90deg, #00f0ff, #ff003c)"
                }}
              />
            </div>
            <div className="meter-actions">
              <button
                type="button"
                className="tactical-btn sub-btn"
                onClick={handleBroodMore}
              >
                TURN DRAMATICALLY
              </button>
            </div>
          </div>
        </div>

        {alertText && (
          <div className="meter-toast mono-val text-amber">
            &gt; {alertText}
          </div>
        )}
      </div>
    </div>
  );
};
