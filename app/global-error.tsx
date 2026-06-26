"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          background: "#f5f0eb",
          color: "#1a1a2e",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>
          Something went wrong.
        </h2>
        <button
          onClick={reset}
          style={{
            padding: "10px 24px",
            borderRadius: "10px",
            background: "#1bb8bd",
            color: "white",
            border: "none",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
