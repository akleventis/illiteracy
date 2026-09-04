"use client"
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

const STORAGE_KEY = "theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const resolve = () => setTheme(stored || (mql.matches ? "dark" : "light"));
    resolve();

    if (!stored) {
      mql.addEventListener("change", resolve);
      return () => mql.removeEventListener("change", resolve);
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button
      className="theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
