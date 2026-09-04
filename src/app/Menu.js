"use client"
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Menu({ current }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const itemClass = (name) => (current === name ? "menu-item active" : "menu-item");

  return (
    <div className="menu" ref={ref}>
      <button
        className="menu-toggle"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        ☰
      </button>
      {open && (
        <div className="menu-list">
          <Link className={itemClass("home")} href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link className={itemClass("history")} href="/history" onClick={() => setOpen(false)}>
            Chat History
          </Link>
        </div>
      )}
    </div>
  );
}
