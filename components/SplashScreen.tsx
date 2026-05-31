"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const steps = [15, 35, 55, 75, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      setProgress(steps[i]);
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        // Fade out
        setTimeout(() => {
          setVisible(false);
          setTimeout(onFinish, 300); // let fade complete
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
      {/* Logo / Initials */}
      <div className="mb-6 w-20 h-20 rounded-full border-2 border-[#ff6fd8] flex items-center justify-center">
        <span className="text-2xl font-extrabold text-[#ff6fd8] font-display">
          MR
        </span>
      </div>

      {/* Title */}
      <h1 className="text-base font-semibold text-white mb-6 font-display tracking-tight">
        Mizan&apos;s Portfolio
      </h1>

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
    </div>
  );
}
