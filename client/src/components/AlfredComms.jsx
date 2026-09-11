import React, { useState } from "react";
import { MessageSquareIcon, CoffeeIcon, RefreshCwIcon } from "./Icons";
import { fetchAlfredComms } from "../services/api";
import { playBeep, playTypingClick, playTacticalChirp } from "../utils/sound";

const alfredSmartReply = (userQuery) => {
  const q = userQuery.toLowerCase();
  if (q.includes("dinner") || q.includes("food") || q.includes("eat") || q.includes("hungry")) {
    return "I prepared a roasted duck breast three hours ago, sir. It has now achieved the same temperature as your emotional demeanor.";
  }
  if (q.includes("tea") || q.includes("coffee") || q.includes("earl grey")) {
    return "Freshly brewed Earl Grey is waiting in the library, Master Bruce. Two lumps of sugar, zero lumps of brooding.";
  }
  if (q.includes("joker") || q.includes("clown") || q.includes("riddler") || q.includes("villain")) {
    return "Surveillance indicates Arkham inmates are currently asleep. Even sociopaths recognize standard resting hours, sir.";
  }
  if (q.includes("cape") || q.includes("suit") || q.includes("gargoyle")) {
    return "The cape was dry-cleaned and carbon-sealed, sir. Do try not to snag it on municipal masonry tonight.";
  }
  if (q.includes("robin") || q.includes("nightwing") || q.includes("batgirl")) {
    return "Master Dick called to inform us that he has a normal bedtime, and suggested you explore that novel concept as well.";
  }
  if (q.includes("gordon") || q.includes("police") || q.includes("signal")) {
    return "The Commissioner is having coffee at the precinct. He asked if you could refrain from vanishing while he is mid-sentence.";
  }
  if (q.includes("night") || q.includes("vengeance") || q.includes("justice")) {
    return "Yes, sir, you are vengeance, you are the night. But you still need clean socks.";
  }
  if (q.includes("money") || q.includes("wayne") || q.includes("business")) {
    return "Wayne Enterprises recorded an 8% profit margin today, largely because you did not attend the board meeting.";
  }
  // Default witty response
  const fallbacks = [
    "A deeply fascinating inquiry, sir. I shall file it immediately under 'Things To Contemplate While Staring Into The Abyss'.",
    "I have noted your directive, Master Bruce. In return, might I suggest a minimum of four hours of horizontal sleep?",
    "Very well, sir. But if you catch pneumonia from midnight rooftop surveillance, I shall not be vacuuming your cape.",
    "Indeed, sir. Even the Dark Knight must occasionally admit that a warm scone solves more problems than a smoke pellet.",
    "I shall take care of that, sir. Please do try to smile occasionally; the security cameras are starting to find you intimidating."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

export const AlfredComms = ({ initialMessage }) => {
  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedLogs, setFeedLogs] = useState([
    {
      time: "21:04:12",
      sender: "Alfred",
      text: initialMessage || "Sir, Gotham appears suspiciously peaceful. I recommend having some tea and stepping away from the monitors."
    }
  ]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMsg).trim();
    if (!query) return;

    playTypingClick();
    const timeNow = new Date().toLocaleTimeString("en-US", { hour12: false });

    // Append user message
    const updated = [
      ...feedLogs,
      { time: timeNow, sender: "Bruce", text: query }
    ];
    setFeedLogs(updated);
    setInputMsg("");
    setLoading(true);

    // Alfred replies after a brief butler pause
    setTimeout(() => {
      const reply = alfredSmartReply(query);
      setFeedLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString("en-US", { hour12: false }),
          sender: "Alfred",
          text: reply
        }
      ]);
      playBeep(680, 0.08);
      setLoading(false);
    }, 600);
  };

  const handleFetchAlfredWisdom = async () => {
    setLoading(true);
    playTacticalChirp();
    try {
      const data = await fetchAlfredComms();
      setFeedLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString("en-US", { hour12: false }),
          sender: "Alfred",
          text: data.message
        }
      ]);
      playBeep(720, 0.08);
    } catch {
      setFeedLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString("en-US", { hour12: false }),
          sender: "Alfred",
          text: "Master Bruce, standing in the rain does not constitute a tactical plan."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "What's for dinner?",
    "Report brooding index",
    "Where is the Joker?",
    "Order more Batarangs",
    "I am the night"
  ];

  const latestAlfred = [...feedLogs].reverse().find((l) => l.sender === "Alfred")?.text || "Standing by, sir.";

  return (
    <div className="tactical-panel alfred-comms-panel">
      <div className="panel-header">
        <div className="panel-title text-cyan">
          <MessageSquareIcon size={16} /> SECURE BUTLER COMM-LINK // PENNYWORTH
        </div>
        <div className="panel-tag">STATUS: CONCERNED & SKEPTICAL</div>
      </div>

      <div className="panel-content">
        <div className="alfred-avatar-row">
          <div className="alfred-portrait">
            <span className="alfred-monogram mono-val">A.P.</span>
            <span className="alfred-title">BUTLER</span>
          </div>

          <div className="alfred-latest-bubble">
            <span className="bubble-label mono-val">LATEST TRANSMISSION FROM MANOR PANTRY:</span>
            <p className="bubble-text mono-val highlight-cyan">
              "{latestAlfred}"
            </p>
          </div>
        </div>

        {/* Scrollable encrypted intercom stream */}
        <div className="comms-stream-box alfred-chat-history">
          <div className="stream-header mono-val">WAYNE MANOR INTERCOM LOG // ENCRYPTED LINE 01</div>
          {feedLogs.map((log, i) => (
            <div key={i} className={`stream-entry mono-val ${log.sender === "Bruce" ? "bruce-entry" : "alfred-entry"}`}>
              <span className="stream-time">[{log.time}]</span>{" "}
              <span className={`stream-sender ${log.sender === "Bruce" ? "text-cyan" : "text-amber"}`}>
                {log.sender === "Bruce" ? "MASTER BRUCE" : "ALFRED"}:
              </span>{" "}
              <span className="stream-text">{log.text}</span>
            </div>
          ))}
          {loading && (
            <div className="stream-entry mono-val alfred-typing pulse-amber">
              &gt; Alfred is raising an eyebrow and composing a retort...
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="quick-chips-row">
          <span className="chips-label mono-val">QUICK INTERCOM:</span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="quick-chip-btn mono-val"
              onClick={() => handleSendMessage(prompt)}
              disabled={loading}
            >
              "{prompt}"
            </button>
          ))}
        </div>

        {/* Two-Way Intercom Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="term-input-form alfred-input-form"
        >
          <span className="term-prompt mono-val text-amber">MANOR_COMMS:\\&gt;</span>
          <input
            type="text"
            className="term-input mono-val"
            placeholder="Send directive or question to Alfred..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="tactical-btn sub-btn amber" disabled={loading}>
            TRANSMIT
          </button>
        </form>

        <div className="panel-footer-actions">
          <button
            type="button"
            className="tactical-btn"
            onClick={handleFetchAlfredWisdom}
            disabled={loading}
          >
            <RefreshCwIcon size={12} className={loading ? "spin-animation" : ""} />
            PING PENNYWORTH
          </button>
          <button
            type="button"
            className="tactical-btn amber"
            onClick={() => handleSendMessage("Alfred, please prepare a pot of Earl Grey tea.")}
            disabled={loading}
          >
            <CoffeeIcon size={14} /> REQUEST TEA & SCONES
          </button>
        </div>
      </div>
    </div>
  );
};
