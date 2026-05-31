"use client";

import { Search } from "lucide-react";

type Props = {
  openCommandPalette: () => void;
};

export default function Topbar({ openCommandPalette }: Props) {
  return (
    <div
      className="bg-vscode-title flex items-center gap-2 px-3 border-b border-black select-none"
      style={{ gridArea: "title" }}
    >
      {/* Traffic lights */}
      <div className="flex gap-1.5 group">
        {(
          [
            ["#ff5f57", "✕", "rgb(153,0,0)"],
            ["#ffbd2e", "−", "rgb(122,80,0)"],
            ["#27c93f", "⤢", "rgb(0,101,0)"],
          ] as [string, string, string][]
        ).map(([bg, sym, col], i) => (
          <button
            key={i}
            className="w-3 h-3 rounded-full hover:brightness-110 transition-all relative border-none outline-none flex-shrink-0"
            style={{ background: bg }}
          >
            <span
              className="absolute inset-0 flex items-center justify-center text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: col }}
            >
              {sym}
            </span>
          </button>
        ))}
      </div>

      {/* Center search */}
      <button
        onClick={openCommandPalette}
        className="flex-1 max-w-xs mx-auto flex items-center justify-center gap-2 bg-white/[0.07] border border-white/10 rounded-[5px] px-3 py-[3px] text-[11px] text-vscode-dim hover:bg-white/10 transition-colors"
      >
        🔍 mizan-portfolio : portfolio
        <span className="flex gap-1 ml-1">
          <kbd className="bg-white/10 px-1 py-[1px] rounded text-[10px]">
            Ctrl
          </kbd>
          <kbd className="bg-white/10 px-1 py-[1px] rounded text-[10px]">P</kbd>
        </span>
      </button>
    </div>
  );
}
