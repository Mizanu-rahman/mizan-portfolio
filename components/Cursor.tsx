"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, ox = 0, oy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      // inner dot follows exactly via left/top
      if (innerRef.current) {
        innerRef.current.style.left = mx + "px";
        innerRef.current.style.top  = my + "px";
      }
    };

    const animate = () => {
      // outer ring lags — exactly like Aahana's implementation
      ox += (mx - ox) * 0.12;
      oy += (my - oy) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = ox + "px";
        outerRef.current.style.top  = oy + "px";
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    const onDown = () => {
      if (outerRef.current) {
        outerRef.current.style.width  = "40px";
        outerRef.current.style.height = "40px";
        outerRef.current.style.borderColor = "rgba(255,255,255,0.8)";
      }
    };
    const onUp = () => {
      if (outerRef.current) {
        outerRef.current.style.width  = "26px";
        outerRef.current.style.height = "26px";
        outerRef.current.style.borderColor = "rgba(255,255,255,0.55)";
      }
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer ring — square, crosshair arms, lags behind */}
      <div
        id="retro-cursor-outer"
        ref={outerRef}
        style={{
          position: "fixed",
          width: 26, height: 26,
          border: "1.5px solid rgba(255,255,255,0.55)",
          pointerEvents: "none",
          zIndex: 999999,
          transform: "translate(-50%, -50%)",
          transition: "width 0.18s ease, height 0.18s ease, border-color 0.18s ease, background 0.18s ease",
          // NO border-radius — it's square like Aahana's
        }}
      />
      {/* Inner dot — square, instant */}
      <div
        id="retro-cursor-inner"
        ref={innerRef}
        style={{
          position: "fixed",
          width: 5, height: 5,
          background: "rgba(255,255,255,0.9)",
          pointerEvents: "none",
          zIndex: 999999,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 6px rgba(255,255,255,0.5)",
          // NO border-radius — square dot
        }}
      />
      {/* Crosshair arms via global style (matching Aahana's ::before/::after) */}
      <style>{`
        #retro-cursor-outer::before, #retro-cursor-outer::after {
          content: '';
          position: absolute;
          background: rgba(255,255,255,0.4);
        }
        #retro-cursor-outer::before {
          top: 50%; left: -5px;
          width: 4px; height: 1px;
          transform: translateY(-50%);
        }
        #retro-cursor-outer::after {
          left: 50%; top: -5px;
          height: 4px; width: 1px;
          transform: translateX(-50%);
        }
      `}</style>
    </>
  );
}
