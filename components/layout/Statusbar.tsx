"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { files } from "@/lib/files";
import { useToast } from "@/lib/toast-context";

const LANG_MAP: Record<string, string> = {
  home: "TypeScript React",
  about: "HTML",
  projects: "JavaScript",
  skills: "JSON",
  training: "TypeScript",
  contact: "CSS",
};

const THEMES = [
  { id: "", label: "💜 Mizan's Dark", short: "Mizan's Dark" },
  { id: "gruvbox", label: "🟫 Gruvbox", short: "Gruvbox" },

  { id: "rose-pine", label: "🌸 Rosé Pine", short: "Rosé Pine" },
  { id: "tokyo-night", label: "🌃 Tokyo Night", short: "Tokyo Night" },
  { id: "catppuccin", label: "🐱 Catppuccin", short: "Catppuccin" },
  { id: "nord", label: "❄ Nord", short: "Nord" },
];

type Props = {
  activeFile: string;
  theme: string;
  setTheme: (t: string) => void;
  toggleTerminal: () => void;
  openPalette: () => void;
};

export default function Statusbar({
  activeFile,
  theme,
  setTheme,
  toggleTerminal,
  openPalette,
}: Props) {
  const [time, setTime] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      setTime(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`,
      );
    };
    fmt();
    const t = setInterval(fmt, 15000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!notification) return;
    const timeout = setTimeout(() => setNotification(null), 2000);
    return () => clearTimeout(timeout);
  }, [notification]);

  const currentLabel =
    THEMES.find((t) => t.id === theme)?.label ?? "💜 Mizan's Dark";
  const currentShort =
    THEMES.find((t) => t.id === theme)?.short ?? "Mizan's Dark";

  const handleThemeSelect = (id: string) => {
    const newTheme = THEMES.find((t) => t.id === id);
    setTheme(id);
    setPickerOpen(false);
    if (newTheme) {
      toast(`Theme switched to ${newTheme.label}`, "info");
    }
  };

  return (
    <div
      className="flex items-center justify-between px-2 select-none overflow-hidden"
      style={{ gridArea: "status", background: "var(--blue2)", height: 22 }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={toggleTerminal}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors whitespace-nowrap text-[11px]"
        >
          ⎇ main
        </button>
        <button
          onClick={toggleTerminal}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors whitespace-nowrap text-[11px]"
        >
          ⚠ 0 &nbsp; ⊗ 0
        </button>
        <button className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors whitespace-nowrap text-[11px]"></button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={openPalette}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors text-[11px] whitespace-nowrap"
        >
          Copilot
        </button>
        <button className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors text-[11px] whitespace-nowrap">
          {LANG_MAP[activeFile] ?? "TypeScript React"}
        </button>
        <button className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors text-[11px] whitespace-nowrap">
          UTF-8
        </button>
        <button className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors text-[11px] whitespace-nowrap">
          Prettier
        </button>

        {/* Light/Dark toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "" : "light")}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors text-[11px] whitespace-nowrap"
          title="Toggle light/dark mode"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {/* Theme toggle button – shows the full label with emoji */}
        <button
          ref={buttonRef}
          onClick={() => setPickerOpen((prev) => !prev)}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors text-[11px] whitespace-nowrap"
        >
          {currentLabel}
          <span className="opacity-50 text-[9px] ml-0.5">
            {pickerOpen ? "▼" : "▲"}
          </span>
        </button>

        {/* Theme dropdown (portal) – slim, with short labels */}
        {pickerOpen &&
          createPortal(
            <div
              className="fixed inset-0 z-[998]"
              onClick={() => setPickerOpen(false)}
            >
              <div className="absolute inset-0" />
              <div
                className="absolute z-[999] py-1 rounded shadow-[0_8px_24px_rgba(0,0,0,0.4)] w-[155px]"
                style={{
                  background: "var(--bg3)",
                  border: "1px solid var(--border)",
                  bottom: "28px",
                  right: "12px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-vscode-dim">
                  Theme
                </div>
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleThemeSelect(t.id);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[11px] truncate transition-colors hover:bg-vscode-blue2 hover:text-white ${
                      theme === t.id ? "text-vscode-blue" : "text-vscode-text"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>,
            document.body,
          )}
        {/* Theme change notification */}
        {notification &&
          createPortal(
            <div
              className="fixed z-[1000] px-3 py-1.5 rounded-sm shadow-md text-[11px] font-medium pointer-events-none animate-[fadeOut_0.5s_1.5s_ease_forwards]"
              style={{
                bottom: "28px",
                right: "160px",
                background: "var(--bg3)",
                border: "1px solid var(--border)",
                color: "var(--bright)",
              }}
            >
              {notification}
            </div>,
            document.body,
          )}

        <button className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white/85 hover:bg-white/15 transition-colors text-[11px] whitespace-nowrap">
          {time}
        </button>
      </div>
    </div>
  );
}
