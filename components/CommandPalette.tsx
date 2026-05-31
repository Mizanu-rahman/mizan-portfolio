"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Terminal, Sidebar, Palette, FileText } from "lucide-react";
import { files } from "@/lib/files";

const THEMES = [
  { id: "mizan-dark", label: "💜 Mizan Dark (Default)" },
  { id: "rose-pine", label: "🌸 Rosé Pine" },
  { id: "tokyo-night", label: "🌃 Tokyo Night" },
  { id: "catppuccin", label: "🐱 Catppuccin" },
  { id: "nord", label: "❄ Nord" },
  { id: "gruvbox", label: "🟫 Gruvbox" },
];

type Props = {
  open: boolean;
  close: () => void;
  openFile?: (id: string) => void;
  toggleTerminal?: () => void;
  toggleSidebar?: () => void;
  setTheme?: (t: string) => void;
  toggleCopilot?: () => void;
  currentTheme?: string;
};

export default function CommandPalette({
  open,
  close,
  openFile,
  toggleTerminal,
  toggleSidebar,
  setTheme,
  toggleCopilot,
  currentTheme,
}: Props) {
  const [query, setQuery] = useState("");
  const [selIdx, setSelIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo(
    () => [
      ...files
        .filter((f) => f.id !== "resume")
        .map((f) => ({
          id: f.id,
          label: `Open ${f.name}`,
          icon: <FileText size={15} />,
          action: () => {
            openFile?.(f.id);
            close();
          },
        })),
      {
        id: "terminal",
        label: "Toggle Terminal",
        icon: <Terminal size={15} />,
        action: () => {
          toggleTerminal?.();
          close();
        },
      },
      {
        id: "sidebar",
        label: "Toggle Sidebar",
        icon: <Sidebar size={15} />,
        action: () => {
          toggleSidebar?.();
          close();
        },
      },
      ...THEMES.map((t) => ({
        id: `theme-${t.id}`,
        label: `Theme: ${t.label}`,
        icon: <Palette size={15} />,
        action: () => {
          setTheme?.(t.id);
          close();
        },
      })),
    ],
    [openFile, toggleTerminal, toggleSidebar, setTheme, close],
  );

  const filtered = useMemo(
    () =>
      commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [commands, query],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);
  useEffect(() => {
    setSelIdx(0);
  }, [query]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelIdx((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelIdx((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && filtered[selIdx]) filtered[selIdx].action();
    if (e.key === "Escape") close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-24"
          onClick={close}
        >
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.14 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[600px] rounded-xl overflow-hidden bg-[#1c1c1e] border border-[#303030] shadow-2xl"
          >
            <div className="h-12 border-b border-[#2a2a2a] flex items-center px-4 gap-3">
              <Search size={16} className="text-zinc-500 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a command or file name..."
                className="flex-1 bg-transparent outline-none text-white text-[13px] placeholder:text-zinc-600"
              />
              <kbd className="text-[11px] text-zinc-600 bg-[#252525] px-2 py-0.5 rounded">
                ESC
              </kbd>
            </div>
            <div className="max-h-[360px] overflow-y-auto py-1">
              {filtered.length === 0 && (
                <div className="py-8 text-center text-zinc-600 text-sm">
                  No results found
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelIdx(i)}
                  className={`w-full h-10 px-4 flex items-center gap-3 text-[13px] transition-colors ${
                    i === selIdx
                      ? "bg-[#0d6efd]/20 text-white"
                      : "text-zinc-400 hover:bg-[#252525]"
                  }`}
                >
                  <span className="text-zinc-500">{cmd.icon}</span>
                  {cmd.label}
                  {i === selIdx && (
                    <span className="ml-auto text-[11px] text-zinc-600">
                      ↵ Enter
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
