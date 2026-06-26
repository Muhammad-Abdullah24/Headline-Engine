"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Sync state with whatever the pre-paint script already applied.
  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ?? "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("hirenum-theme", next);
    } catch {
      /* ignore storage errors */
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        position: "relative",
        width: "40px",
        height: "40px",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        background: "var(--glass-strong)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--ink)",
        overflow: "hidden",
        // Avoid an icon flash before we know the real theme
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.3s ease, border-color 0.3s ease, background 0.3s ease",
      }}
    >
      {/* Sun */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          position: "absolute",
          color: "#fbbf24",
          transform: isDark ? "rotate(-90deg) scale(0.3)" : "rotate(0) scale(1)",
          opacity: isDark ? 0 : 1,
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
        }}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>

      {/* Moon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          color: "var(--teal-bright)",
          transform: isDark ? "rotate(0) scale(1)" : "rotate(90deg) scale(0.3)",
          opacity: isDark ? 1 : 0,
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
        }}
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
