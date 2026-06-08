"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const steps = [15, 35, 55, 75, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      setProgress(steps[i]);
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onFinish, 300);
        }, 400);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#1e1e1e] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Glitchy "M" */}
      <div className="relative mb-8 text-8xl font-black font-display text-white select-none">
        <span className="relative inline-block glitch-text" data-text="M">
          M
        </span>
      </div>

      {/* Loading bar */}
      <div className="w-48 h-1 bg-[#333] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#007acc] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status text */}
      <p className="mt-3 text-[11px] text-zinc-500 font-mono">
        {progress < 100 ? "Loading..." : "Ready"}
      </p>

      {/* Glitch animation CSS */}
      <style>{`
        .glitch-text {
          position: relative;
          display: inline-block;
          animation: glitch-skew 1s infinite linear alternate-reverse;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .glitch-text::before {
          color: #ff6fd8;
          z-index: -1;
          animation: glitch-anim-1 0.4s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          color: #4fc1ff;
          z-index: -2;
          animation: glitch-anim-2 0.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 30% 0); transform: translate(-2px, -2px); }
          100% { clip-path: inset(60% 0 10% 0); transform: translate(2px, 2px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(40% 0 20% 0); transform: translate(2px, -2px); }
          100% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          100% { transform: skew(2deg); }
        }
      `}</style>
    </div>
  );
}
