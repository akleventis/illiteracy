"use client"
import { ClipboardIcon, CheckIcon } from "./icons";
import { useCopied } from "./useCopied";

const formatTime = (ts) =>
  new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default function HistoryPanel({ items, onRemove, onClear }) {
  const [copiedId, copy] = useCopied();

  if (items.length === 0) {
    return <p className="empty">Nothing here yet — corrections you run show up here.</p>;
  }

  return (
    <div className="history">
      <button className="clear" onClick={onClear}>Clear all</button>

      {items.map((item) => (
        <div className="entry" key={item.id}>
          <div className="entry-head">
            <span className="meta">{item.mode} · {item.career} · {formatTime(item.ts)}</span>
            <button className="entry-remove" aria-label="Remove" onClick={() => onRemove(item.id)}>
              ×
            </button>
          </div>
          <div className="entry-in">{item.input}</div>
          <div className="entry-out">
            <button
              className="copy"
              aria-label={copiedId === item.id ? "Copied" : "Copy to clipboard"}
              onClick={() => copy(item.output, item.id)}
            >
              {copiedId === item.id ? <CheckIcon /> : <ClipboardIcon />}
            </button>
            {item.output}
          </div>
        </div>
      ))}
    </div>
  );
}
