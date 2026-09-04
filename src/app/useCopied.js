"use client"
import { useState } from "react";

export function useCopied(timeout = 1500) {
  const [copied, setCopied] = useState(null);

  const copy = (text, key = true) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(key);
        setTimeout(() => setCopied(null), timeout);
      })
      .catch(() => {});
  };

  return [copied, copy];
}
