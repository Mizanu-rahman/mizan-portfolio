"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search, Terminal, Sparkles, Download, Maximize } from "lucide-react";

const THEMES = [
  { id: "", label: "💜 Mizan Dark" },
  { id: "gruvbox", label: "🟫 Gruvbox" },

  { id: "rose-pine", label: "🌸 Rosé Pine" },
  { id: "tokyo-night", label: "🌃 Tokyo Night" },
  { id: "catppuccin", label: "🐱 Catppuccin" },
  { id: "nord", label: "❄ Nord" },
];

const SHORTCUTS = [
  { keys: "Ctrl P", desc: "Go to file (command palette)" },
  { keys: "Ctrl `", desc: "Toggle terminal" },
  { keys: "Ctrl B", desc: "Toggle sidebar" },
  { keys: "Esc", desc: "Close overlay" },
  { keys: "↑ / ↓", desc: "Terminal history" },
];

type Props = {
  open: boolean;
  close: () => void;
  theme: string;
  setTheme: (t: string) => void;
  openCommandPalette: () => void;
  toggleTerminal: () => void;
  toggleCopilot: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
};

export default function SettingsModal({
  open,
  close,
  theme,
  setTheme,
  openCommandPalette,
  toggleTerminal,
  toggleCopilot,
  triggerRef,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    // Position panel directly at the right edge of the activity bar (no horizontal offset)
    // so it completely overlaps the sidebar
    const top = rect.top + 30;
    const left = rect.right; // exactly at the activity bar's right edge

    setPos({ top, left });
  }, [open, triggerRef]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open, close, triggerRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={panelRef}
      className="fixed z-[1000] w-[280px] bg-[var(--bg3)] border border-[var(--border)] rounded-lg shadow-2xl text-sm text-[var(--text)]"
      style={{
        top: pos.top,
        left: pos.left,
        maxHeight: "calc(100vh - 40px)",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] font-semibold">
        <span className="text-[13px]">Settings</span>
        <button
          onClick={close}
          className="text-[var(--dim)] hover:text-[var(--text)]"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="py-2">
        {/* Color Theme */}
        <div className="px-3 py-1">
          <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--dim)] mb-2 px-2 font-bold">
            🎨 Color Theme
          </div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                close();
              }}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[12px] font-semibold transition-colors ${
                theme === t.id
                  ? "bg-[var(--blue2)] text-white"
                  : "hover:bg-[var(--bg4)] text-[var(--text)]"
              }`}
            >
              {t.label}
              {theme === t.id && <span className="text-[10px]">✓</span>}
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t border-[var(--border)] mt-2 pt-2 px-3">
          <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--dim)] mb-2 px-2 font-bold">
            ⚡ Quick Actions
          </div>
          {[
            {
              icon: Search,
              label: "Command Palette",
              action: () => {
                openCommandPalette();
                close();
              },
            },
            {
              icon: Terminal,
              label: "Toggle Terminal",
              action: () => {
                toggleTerminal();
                close();
              },
            },
            {
              icon: Sparkles,
              label: "Copilot Chat",
              action: () => {
                toggleCopilot();
                close();
              },
            },
            {
              icon: Download,
              label: "Download Resume",
              action: () => {
                window.open("https://github.com/Mizanur-Rahmann", "_blank");
                close();
              },
            },
            {
              icon: Maximize,
              label: "Toggle Fullscreen",
              action: () => {
                if (document.fullscreenElement) document.exitFullscreen();
                else document.documentElement.requestFullscreen();
                close();
              },
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-2 py-1.5 rounded text-[12px] font-semibold hover:bg-[var(--bg4)] transition-colors"
            >
              <item.icon size={15} className="text-[var(--dim)]" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Keyboard Shortcuts */}
        <div className="border-t border-[var(--border)] mt-2 pt-2 px-3">
          <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--dim)] mb-2 px-2 font-bold">
            ⌨️ Keyboard Shortcuts
          </div>
          {SHORTCUTS.map((s) => (
            <div
              key={s.keys}
              className="flex justify-between px-2 py-1 text-[11px] font-medium"
            >
              <span className="text-[var(--dim)]">{s.desc}</span>
              <kbd className="bg-[var(--bg4)] px-2 py-0.5 rounded text-[var(--text)] text-[10px] font-mono font-bold">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border)] px-4 py-2 text-[10px] text-[var(--dim)] text-center font-medium">
        Portfolio v3.0 · Made with 💜 by Mizanur
      </div>
    </div>,
    document.body,
  );
}
