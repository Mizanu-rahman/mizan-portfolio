"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const positions = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    let mx = 0,
      my = 0,
      ox = 0,
      oy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (innerRef.current) {
        innerRef.current.style.left = mx + "px";
        innerRef.current.style.top = my + "px";
      }
      // Store position for trail
      positions.current.push({ x: mx, y: my });
      if (positions.current.length > 8) {
        positions.current.shift();
      }
    };

    const animate = () => {
      ox += (mx - ox) * 0.12;
      oy += (my - oy) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = ox + "px";
        outerRef.current.style.top = oy + "px";
      }
      // Update trail dots
      trailRefs.current.forEach((dot, i) => {
        const pos = positions.current[positions.current.length - 1 - i];
        if (dot && pos) {
          dot.style.left = pos.x + "px";
          dot.style.top = pos.y + "px";
          dot.style.opacity = String(0.6 - i * 0.07);
          dot.style.transform =
            "translate(-50%, -50%) scale(" + (1 - i * 0.08) + ")";
        }
      });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    const onDown = () => {
      if (outerRef.current) {
        outerRef.current.style.width = "40px";
        outerRef.current.style.height = "40px";
        outerRef.current.style.borderColor = "rgba(255,255,255,0.8)";
      }
    };
    const onUp = () => {
      if (outerRef.current) {
        outerRef.current.style.width = "26px";
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
      {/* Trail dots */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          style={{
            position: "fixed",
            width: 4,
            height: 4,
            background: "rgba(255,255,255,0.5)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 99998,
            opacity: 0,
            transition: "opacity 0.15s ease",
          }}
        />
      ))}

      {/* Outer ring */}
      <div
        id="retro-cursor-outer"
        ref={outerRef}
        style={{
          position: "fixed",
          width: 26,
          height: 26,
          border: "1.5px solid rgba(255,255,255,0.55)",
          pointerEvents: "none",
          zIndex: 999999,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.18s ease, height 0.18s ease, border-color 0.18s ease",
        }}
      />

      {/* Inner dot */}
      <div
        id="retro-cursor-inner"
        ref={innerRef}
        style={{
          position: "fixed",
          width: 5,
          height: 5,
          background: "rgba(255,255,255,0.9)",
          pointerEvents: "none",
          zIndex: 999999,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 6px rgba(255,255,255,0.5)",
        }}
      />

      {/* Crosshair arms */}
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
