"use client"
import { useState, useEffect } from "react";
import Menu from "../Menu";
import HistoryPanel from "../HistoryPanel";
import { loadHistory, removeHistoryEntry, clearHistory } from "../history-store";

export default function HistoryPage() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  return (
    <div className="container">
      <Menu current="history" />

      <h2>chat history</h2>

      <p className="disclaimer">
        Saved only in this browser on this device. It won&apos;t show up on your other
        devices or browsers, and clearing your browser data erases it.
      </p>

      {history !== null && (
        <HistoryPanel
          items={history}
          onRemove={(id) => setHistory(removeHistoryEntry(id))}
          onClear={() => setHistory(clearHistory())}
        />
      )}
    </div>
  );
}
