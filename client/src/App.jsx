import React, { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { LoginScreen } from "./components/LoginScreen";
import { BatmanStatus } from "./components/BatmanStatus";
import { ThreatMatrix } from "./components/ThreatMatrix";
import { WayneFinance } from "./components/WayneFinance";
import { GothamWeather } from "./components/GothamWeather";
import { VillainScanner } from "./components/VillainScanner";
import { BatSignalModal } from "./components/BatSignalModal";
import { EmergencyAlert } from "./components/EmergencyAlert";
import { AlfredComms } from "./components/AlfredComms";
import { SystemDiagnostics } from "./components/SystemDiagnostics";
import { MissionsBoard } from "./components/MissionsBoard";
import { TacticalTerminal } from "./components/TacticalTerminal";
import { CoffeeAndBroodMeter } from "./components/CoffeeAndBroodMeter";
import { BatLogoIcon, RadioIcon } from "./components/Icons";

import {
  fetchBatmanStatus,
  fetchThreat,
  fetchCrimeStats,
  fetchWayneBalance,
  fetchGothamWeather,
  fetchSystemDiagnostics,
  fetchUselessIntel,
  fetchMissions,
  fetchAlfredComms
} from "./services/api";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBroodMode, setIsBroodMode] = useState(false);
  const [isSignalOpen, setIsSignalOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Tactical data states
  const [batmanData, setBatmanData] = useState(null);
  const [threatData, setThreatData] = useState(null);
  const [crimeData, setCrimeData] = useState(null);
  const [financeData, setFinanceData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [sysDiagnostics, setSysDiagnostics] = useState(null);
  const [uselessIntel, setUselessIntel] = useState("");
  const [missionsData, setMissionsData] = useState(null);
  const [initialAlfred, setInitialAlfred] = useState("");
  const [activeTab, setActiveTab] = useState("TACTICAL_HUD"); // TACTICAL_HUD, SURVEILLANCE, MISSIONS, TERMINAL

  // Refresh all dashboard metrics
  const refreshAllData = useCallback(async () => {
    try {
      const [
        batman,
        threat,
        crime,
        finance,
        weather,
        sysDiag,
        intel,
        missions,
        alfred
      ] = await Promise.allSettled([
        fetchBatmanStatus(),
        fetchThreat(),
        fetchCrimeStats(),
        fetchWayneBalance(),
        fetchGothamWeather(),
        fetchSystemDiagnostics(),
        fetchUselessIntel(),
        fetchMissions(),
        fetchAlfredComms()
      ]);

      if (batman.status === "fulfilled") setBatmanData(batman.value);
      if (threat.status === "fulfilled") setThreatData(threat.value);
      if (crime.status === "fulfilled") setCrimeData(crime.value);
      if (finance.status === "fulfilled") setFinanceData(finance.value);
      if (weather.status === "fulfilled") setWeatherData(weather.value);
      if (sysDiag.status === "fulfilled") setSysDiagnostics(sysDiag.value);
      if (intel.status === "fulfilled") setUselessIntel(intel.value.message);
      if (missions.status === "fulfilled") setMissionsData(missions.value);
      if (alfred.status === "fulfilled") setInitialAlfred(alfred.value.message);
    } catch (e) {
      console.warn("Telemetry refresh glitch", e);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    let isCancelled = false;
    const runUpdate = async () => {
      if (!isCancelled) {
        await refreshAllData();
      }
    };
    runUpdate();
    const interval = setInterval(runUpdate, 30000);
    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [isAuthenticated, refreshAllData]);

  // If not logged in, show Batcomputer access terminal with image1 background
  if (!isAuthenticated) {
    return (
      <div className="app-root">
        <div className="crt-overlay" />
        <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className={`app-root ${isBroodMode ? "mode-brood" : ""}`}>
      {/* Cinematic CRT Scanlines */}
      <div className="crt-overlay" />

      {/* Main Tactical Header */}
      <Header
        onTriggerEmergency={() => setIsEmergencyOpen(true)}
        onLogout={() => setIsAuthenticated(false)}
        isBroodMode={isBroodMode}
        setIsBroodMode={setIsBroodMode}
      />

      {/* Secondary Sub-Navigation Toolbar */}
      <nav className="hud-subnav">
        <div className="subnav-left">
          <button
            type="button"
            className={`subnav-tab ${activeTab === "TACTICAL_HUD" ? "active" : ""}`}
            onClick={() => setActiveTab("TACTICAL_HUD")}
          >
            [01] MAIN TACTICAL HUD
          </button>
          <button
            type="button"
            className={`subnav-tab ${activeTab === "SURVEILLANCE" ? "active" : ""}`}
            onClick={() => setActiveTab("SURVEILLANCE")}
          >
            [02] SURVEILLANCE & SCAN
          </button>
          <button
            type="button"
            className={`subnav-tab ${activeTab === "MISSIONS" ? "active" : ""}`}
            onClick={() => setActiveTab("MISSIONS")}
          >
            [03] DIRECTIVES & COMMS
          </button>
          <button
            type="button"
            className={`subnav-tab ${activeTab === "TERMINAL" ? "active" : ""}`}
            onClick={() => setActiveTab("TERMINAL")}
          >
            [04] BATCAVE CLI
          </button>
        </div>

        <div className="subnav-right">
          <button
            type="button"
            className="tactical-btn subnav-action-btn amber"
            onClick={() => setIsSignalOpen(true)}
          >
            <RadioIcon size={14} /> BAT-SIGNAL CONTROLLER
          </button>
        </div>
      </nav>

      {/* Main HUD Body */}
      <main className="hud-main-container">
        {activeTab === "TACTICAL_HUD" && (
          <div className="hud-grid-layout">
            {/* Top Row: Batman Status & Gotham Threat Matrix */}
            <div className="grid-col-left">
              <BatmanStatus
                data={batmanData}
                onRefresh={async () => {
                  const b = await fetchBatmanStatus();
                  setBatmanData(b);
                }}
              />
              <WayneFinance
                data={financeData}
                onRefresh={async () => {
                  const f = await fetchWayneBalance();
                  setFinanceData(f);
                }}
              />
              <CoffeeAndBroodMeter />
            </div>

            <div className="grid-col-right">
              <ThreatMatrix
                threatData={threatData}
                crimeData={crimeData}
                onRefresh={async () => {
                  const [t, c] = await Promise.all([fetchThreat(), fetchCrimeStats()]);
                  setThreatData(t);
                  setCrimeData(c);
                }}
              />
              <GothamWeather
                data={weatherData}
                onRefresh={async () => {
                  const w = await fetchGothamWeather();
                  setWeatherData(w);
                }}
              />
              <SystemDiagnostics
                data={sysDiagnostics}
                uselessIntel={uselessIntel}
                onRefresh={async () => {
                  const [s, u] = await Promise.all([
                    fetchSystemDiagnostics(),
                    fetchUselessIntel()
                  ]);
                  setSysDiagnostics(s);
                  setUselessIntel(u.message);
                }}
              />
            </div>
          </div>
        )}

        {activeTab === "SURVEILLANCE" && (
          <div className="tab-container-single">
            <VillainScanner />
            <ThreatMatrix
              threatData={threatData}
              crimeData={crimeData}
              onRefresh={async () => {
                const [t, c] = await Promise.all([fetchThreat(), fetchCrimeStats()]);
                setThreatData(t);
                setCrimeData(c);
              }}
            />
          </div>
        )}

        {activeTab === "MISSIONS" && (
          <div className="tab-container-split">
            <MissionsBoard
              missionsData={missionsData}
              onRefresh={async () => {
                const m = await fetchMissions();
                setMissionsData(m);
              }}
            />
            <AlfredComms initialMessage={initialAlfred} />
          </div>
        )}

        {activeTab === "TERMINAL" && (
          <div className="tab-container-single">
            <TacticalTerminal
              onTriggerSignal={() => setIsSignalOpen(true)}
              onTriggerEmergency={() => setIsEmergencyOpen(true)}
              onTriggerScan={() => setActiveTab("SURVEILLANCE")}
            />
          </div>
        )}
      </main>

      {/* Global Ticker Footer */}
      <footer className="hud-footer">
        <div className="footer-left mono-val">
          <BatLogoIcon size={16} className="pulse-cyan" />
          <span>BATCOMPUTER DEFENSE MAINFRAME // ALL SUBSYSTEMS NOMINAL (USELESSNESS: 100%)</span>
        </div>
        <div className="footer-center mono-val text-muted">
          <span>THOUGHT: "{uselessIntel || "Justice is loading..."}"</span>
        </div>
        <div className="footer-right mono-val">
          <span className="text-amber">ALFRED: {sysDiagnostics?.alfred_status || "Making tea"}</span>
        </div>
      </footer>

      {/* Modals */}
      <BatSignalModal
        isOpen={isSignalOpen}
        onClose={() => setIsSignalOpen(false)}
      />

      <EmergencyAlert
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
}

export default App;
