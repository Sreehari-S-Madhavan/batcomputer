import React, { useState, useRef, useEffect } from "react";
import { TerminalIcon } from "./Icons";
import { playBeep, playTypingClick } from "../utils/sound";

export const TacticalTerminal = ({
  onTriggerSignal,
  onTriggerEmergency,
  onTriggerScan
}) => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    { text: "BATCOMPUTER v7.1 COMMAND LINE INTERFACE READY.", type: "system" },
    { text: "Type \"help\" for list of tactical operations, or click quick directives below.", type: "info" }
  ]);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    playTypingClick();

    // Add user entry
    const newHistory = [...history, { text: `> ${cmdStr}`, type: "user" }];

    switch (cleanCmd) {
      case "help":
        newHistory.push({
          text: "AVAILABLE DIRECTIVES:\n - brood     : Measure Batman's current brooding index\n - coffee    : Check Batman's tactical caffeine levels\n - arkham    : Audit Arkham Asylum maximum security status\n - suit      : Run diagnostics on equipped Arkham Batsuit\n - scan      : Scan Gotham surveillance cameras\n - signal    : Ignite rooftop Arkham Bat-Signal beacon\n - emergency : Trigger DEFCON-1 Red Alert\n - alfred    : Intercom Alfred for tea & advice\n - justice   : Diagnostic evaluation of Gotham justice\n - clear     : Clear terminal history",
          type: "system"
        });
        break;

      case "arkham":
        playBeep(300, 0.2, "sawtooth");
        newHistory.push({
          text: "[ARKHAM STATUS] Intensive Treatment: QUIET | Botanical Gardens: UNATTENDED | Medical Facility Spire: Clear of fear toxin. Joker is playing solitaire.",
          type: "info"
        });
        break;

      case "suit":
        playBeep(520, 0.1);
        newHistory.push({
          text: "[SUIT TELEMETRY] Model: Arkham Knight V8.03 Tactical Exosuit | Armor: Tri-weave titanium mesh | Glide Ratio: 3.8:1 | Intimidation factor: 10/10.",
          type: "success"
        });
        break;

      case "villain":
        newHistory.push({
          text: "[ROGUES GALLERY] Top active suspect: 'The Coupon Expire-er' (Threat: 9%, Crime: Attempting to redeem expired Bed Bath coupon at hardware store).",
          type: "warning"
        });
        break;

      case "tea":
        newHistory.push({
          text: "[TEA TELEMETRY] Alfred: 'Earl Grey is hot and steep time has reached 4 minutes. Your presence in the manor is humbly requested.'",
          type: "info"
        });
        break;

      case "brood":
        playBeep(260, 0.2, "sawtooth");
        newHistory.push({
          text: "[BROOD TELEMETRY] Depth: 99.98% | Cape Flutter: Optimal | Gargoyle Grip: Flawless. Recommendation: Continue staring dramatically at nothing.",
          type: "success"
        });
        break;

      case "coffee":
        playBeep(440, 0.1);
        newHistory.push({
          text: "[CAFFEINE SENSOR] Batman Coffee Level: 2% (CRITICAL). Alfred has prepared a fresh pot, but Batman refuses to leave the gargoyle.",
          type: "warning"
        });
        break;

      case "scan":
        onTriggerScan();
        newHistory.push({
          text: "[SURVEILLANCE] Gotham camera scan initiated...",
          type: "system"
        });
        break;

      case "signal":
        onTriggerSignal();
        newHistory.push({
          text: "[ROOFTOP BEACON] Arkham Bat-Signal projector ignited.",
          type: "system"
        });
        break;

      case "emergency":
        onTriggerEmergency();
        newHistory.push({
          text: "[DEFCON 1] Emergency protocol deployed. Absolutely nothing will happen.",
          type: "warning"
        });
        break;

      case "alfred":
        newHistory.push({
          text: "[COMM-LINK] Alfred: 'Yes sir, I am fully aware that the threat level is 97% and nothing is happening. Please finish your soup.'",
          type: "info"
        });
        break;

      case "justice":
        newHistory.push({
          text: "[JUSTICE.EXE] Calculating justice coefficient... 100% justice achieved with 0% effort.",
          type: "success"
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        playBeep(200, 0.15, "square");
        newHistory.push({
          text: `[ERR_COMMAND_UNRECOGNIZED] "${cleanCmd}". Batman does not know what you mean. Brooding instead.`,
          type: "error"
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const quickCommands = ["help", "brood", "arkham", "suit", "coffee", "signal", "emergency", "clear"];

  return (
    <div className="tactical-panel tactical-terminal-panel">
      <div className="panel-header">
        <div className="panel-title">
          <TerminalIcon size={16} /> BATCAVE COMMAND PROMPT & TACTICAL CONSOLE
        </div>
        <div className="panel-tag">CLI INTERACTIVE</div>
      </div>

      <div className="panel-content">
        <div className="terminal-logs-window">
          {history.map((entry, idx) => (
            <div key={idx} className={`term-log-line ${entry.type} mono-val`}>
              <pre>{entry.text}</pre>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Quick chip buttons */}
        <div className="quick-chips-row">
          <span className="chips-label mono-val">QUICK:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="quick-chip-btn mono-val"
              onClick={() => executeCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="term-input-form">
          <span className="term-prompt mono-val">BATCAVE:\\&gt;</span>
          <input
            type="text"
            className="term-input mono-val"
            placeholder="Type directive (e.g. brood, coffee, signal)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" className="tactical-btn sub-btn">
            RUN
          </button>
        </form>
      </div>
    </div>
  );
};
