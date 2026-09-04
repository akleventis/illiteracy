const STORAGE_KEY = "litera-history";
const MAX_HISTORY = 50;

const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const loadHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const save = (history) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // private mode / quota
  }
  return history;
};

export const addHistoryEntry = (entry) =>
  save([{ id: newId(), ts: Date.now(), ...entry }, ...loadHistory()].slice(0, MAX_HISTORY));

export const removeHistoryEntry = (id) =>
  save(loadHistory().filter((h) => h.id !== id));

export const clearHistory = () => save([]);
