"use client";
import { useEffect, useRef } from "react";

/**
 * Animated mesh-gradient background with mouse + scroll parallax.
 * Three blurred orbs drift on their own loops and additionally shift
 * based on pointer position and scroll offset for depth.
 */
export default function Background() {
  const tealRef = useRef<HTMLDivElement>(null);
  const magentaRef = useRef<HTMLDivElement>(null);
  const violetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0,
      my = 0,
      sy = 0,
      raf = 0;

    const apply = () => {
      if (tealRef.current)
        tealRef.current.style.transform = `translate(${mx * 30}px, ${my * 30 + sy * 0.15}px)`;
      if (magentaRef.current)
        magentaRef.current.style.transform = `translate(${mx * -40}px, ${my * -25 + sy * 0.25}px)`;
      if (violetRef.current)
        violetRef.current.style.transform = `translate(${mx * 25}px, ${my * 20 - sy * 0.1}px)`;
      raf = 0;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      schedule();
    };
    const onScroll = () => {
      sy = window.scrollY;
      schedule();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-shell" aria-hidden="true">
      <div ref={tealRef} className="orb orb-teal" />
      <div ref={magentaRef} className="orb orb-magenta" />
      <div ref={violetRef} className="orb orb-violet" />
      <div className="bg-grid" />
      <div className="bg-noise" />
    </div>
  );
}
