"use client";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [clicking, setClicking] = useState(false);

  const handleCopy = async () => {
    setClicking(true);
    await navigator.clipboard.writeText(text);
    setTimeout(() => setClicking(false), 200);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={clicking ? "copy-click" : ""}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "9px 18px",
        borderRadius: "10px",
        border: copied ? "1.5px solid var(--teal)" : "1.5px solid var(--border)",
        background: copied ? "var(--teal-light)" : "var(--glass-strong)",
        color: copied ? "var(--teal-bright)" : "var(--ink)",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
        backdropFilter: "blur(8px)",
      }}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7L5.5 10.5L12 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="4"
              y="4"
              width="8"
              height="9"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M4 3.5C4 2.67 3.33 2 2.5 2H2C1.45 2 1 2.45 1 3v8c0 .55.45 1 1 1h1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}
