import React, { useState } from "react";
import { DollarIcon, RefreshCwIcon } from "./Icons";
import { playBeep, playTacticalChirp } from "../utils/sound";

export const WayneFinance = ({ data, onRefresh }) => {
  const [spendingSim, setSpendingSim] = useState(null);

  const balanceNumber = data?.balance ? Number(data.balance).toLocaleString("en-US") : "84,729,381,204";

  const handleSimulateExpense = (item, cost) => {
    playBeep(480, 0.08);
    setSpendingSim({
      item,
      cost,
      note: "Wayne Enterprises absorbed the cost before the invoice finished loading."
    });
    setTimeout(() => setSpendingSim(null), 4000);
  };

  return (
    <div className="tactical-panel wayne-finance-panel">
      <div className="panel-header">
        <div className="panel-title text-amber">
          <DollarIcon size={16} /> WAYNE ENTERPRISES BROODING REVENUE TICKER
        </div>
        <div className="panel-tag amber">NYSE: WYNE</div>
      </div>

      <div className="panel-content">
        <div className="finance-balance-display">
          <span className="balance-label">TOTAL LIQUID CAPITAL (USD):</span>
          <div className="balance-amount mono-val highlight-amber">
            ${balanceNumber}
          </div>
          <div className="balance-ticker-row">
            <span className="delta-pill text-green mono-val">
              {data?.change || "+$3,420,110"} TODAY
            </span>
            <span className="ticker-reason mono-val">
              "{data?.message || "Bruce made money while brooding."}"
            </span>
          </div>
        </div>

        {/* Tactical Expense Ledger */}
        <div className="expense-quick-triggers">
          <div className="triggers-title">UNNECESSARY TACTICAL EXPENDITURES:</div>
          <div className="triggers-buttons">
            <button
              type="button"
              className="tactical-btn sub-btn"
              onClick={() => handleSimulateExpense("Order 500 Batarangs in Matte Black", "$450,000")}
            >
              500 BATARANGS ($450K)
            </button>
            <button
              type="button"
              className="tactical-btn sub-btn"
              onClick={() => handleSimulateExpense("Reinforce Gotham Gargoyles for Dramatic Posing", "$1,200,000")}
            >
              GARGOYLE REINFORCEMENT ($1.2M)
            </button>
            <button
              type="button"
              className="tactical-btn sub-btn"
              onClick={() => handleSimulateExpense("Alfred High-Grade Earl Grey Imports", "$45,000")}
            >
              ALFRED TEA RESERVE ($45K)
            </button>
            <button
              type="button"
              className="tactical-btn sub-btn"
              onClick={() => handleSimulateExpense("Nano-Carbon Batmobile Ceramic Polish", "$85,000")}
            >
              BATMOBILE CERAMIC WAX ($85K)
            </button>
            <button
              type="button"
              className="tactical-btn sub-btn"
              onClick={() => handleSimulateExpense("Accidentally Buy Bleake Island Steel Mill", "$14,500,000")}
            >
              ACCIDENTAL STEEL MILL ($14.5M)
            </button>
          </div>
        </div>

        {spendingSim && (
          <div className="expense-alert-card mono-val">
            <span className="text-amber">&gt; EXPENDITURE: {spendingSim.item}</span>
            <span className="text-cyan"> {spendingSim.cost}</span>
            <div className="text-muted">{spendingSim.note}</div>
          </div>
        )}

        <div className="panel-footer-actions">
          <button
            type="button"
            className="tactical-btn"
            onClick={() => {
              playTacticalChirp();
              onRefresh();
            }}
          >
            <RefreshCwIcon size={12} /> RECALCULATE DIVIDENDS
          </button>
        </div>
      </div>
    </div>
  );
};
