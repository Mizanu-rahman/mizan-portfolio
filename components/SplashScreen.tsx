"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [buildComplete, setBuildComplete] = useState(false);
  const [matrixBarChars, setMatrixBarChars] = useState("");
  useEffect(() => {
    const steps = [15, 35, 55, 75, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      setProgress(steps[i]);
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setBuildComplete(true); // show “Build succeeded”
        setTimeout(() => {
          setVisible(false);
          setTimeout(onFinish, 300);
        }, 600); // wait a moment after success
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onFinish]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatrixBarChars(
      Array.from({ length: 30 }, () =>
        Math.random().toString(16).slice(2, 4),
      ).join(" "),
    );
  }, []);
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#1e1e1e] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Container for both the M and the orbiting particles */}
      <div className="relative inline-flex items-center justify-center">
        {/* Glitchy "M" */}
        <div className="relative z-10 text-8xl font-black font-display select-none">
          <span
            className="relative inline-block glitch-text"
            data-text="M"
            style={{ color: "#2a2a2a" }}
          >
            M
          </span>
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <span className="particle-dot particle-1" />
          <span className="particle-dot particle-2" />
          <span className="particle-dot particle-3" />
          <span className="particle-dot particle-4" />
          <span className="particle-dot particle-5" />
        </div>
      </div>
      {/* ── Visual Studio Build Bar (Code Rain Fill) ── */}
      <div className="mt-10 w-80 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2 text-[#4ec9b0] font-mono text-xs tracking-wide">
          <span className="inline-block w-2 h-2 rounded-full bg-[#4ec9b0] animate-pulse" />
          <span>{buildComplete ? "Build succeeded" : "Build started..."}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#2a2a2a] border border-[#3e3e42] overflow-hidden relative">
          <div
            className="absolute inset-0 flex items-center overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <span
              className="text-[#0f0] font-mono text-[10px] whitespace-nowrap"
              style={{ textShadow: "0 0 6px #0f0" }}
            >
              {matrixBarChars}
            </span>
          </div>
        </div>
      </div>{" "}
      {/* Glitch + Particle CSS (unchanged) */}
      <style>{`
        /* ===== Glitch Text ===== */
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
          opacity: 0.6;
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

        /* ===== Particle Styles ===== */
        .particle-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4fc1ff;
          opacity: 0.8;
          box-shadow: 0 0 8px #4fc1ff, 0 0 16px #007acc;
          top: 50%;
          left: 50%;
          margin: -4px 0 0 -4px;
        }
        .particle-1 { animation: orbit1 2.4s ease-in-out infinite; }
        .particle-2 { animation: orbit2 2.0s ease-in-out infinite; background: #ff6fd8; box-shadow: 0 0 8px #ff6fd8, 0 0 16px #c586c0; }
        .particle-3 { animation: orbit3 2.8s ease-in-out infinite; width: 6px; height: 6px; margin: -3px 0 0 -3px; }
        .particle-4 { animation: orbit4 2.2s ease-in-out infinite; background: #ff6fd8; box-shadow: 0 0 8px #ff6fd8, 0 0 16px #c586c0; }
        .particle-5 { animation: orbit5 3.0s ease-in-out infinite; width: 5px; height: 5px; opacity: 0.6; margin: -2.5px 0 0 -2.5px; }

        @keyframes orbit1 {
          0%   { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          0%   { transform: rotate(72deg) translateX(60px) rotate(-72deg); }
          100% { transform: rotate(432deg) translateX(60px) rotate(-432deg); }
        }
        @keyframes orbit3 {
          0%   { transform: rotate(144deg) translateX(65px) rotate(-144deg); }
          100% { transform: rotate(504deg) translateX(65px) rotate(-504deg); }
        }
        @keyframes orbit4 {
          0%   { transform: rotate(216deg) translateX(55px) rotate(-216deg); }
          100% { transform: rotate(576deg) translateX(55px) rotate(-576deg); }
        }
        @keyframes orbit5 {
          0%   { transform: rotate(288deg) translateX(70px) rotate(-288deg); }
          100% { transform: rotate(648deg) translateX(70px) rotate(-648deg); }
        }


      `}</style>
    </div>
  );
}
