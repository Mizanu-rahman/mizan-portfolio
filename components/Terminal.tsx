"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { resumeData } from "@/data/resumeData";
import { useToast } from "@/lib/toast-context";

type Line = { type: "cmd" | "out" | "err" | "info"; text: string };

const COMMANDS: Record<
  string,
  (
    args: string[],
    openFile?: (id: string) => void,
    setTheme?: (t: string) => void,
  ) => Line[]
> = {
  help: () => [
    { type: "info", text: "Available commands:" },
    {
      type: "out",
      text: "  open <file>   — open a file (home|about|projects|skills|training|contact|readme)",
    },
    {
      type: "out",
      text: "  theme <name>  — change theme (dark|rosepine|tokyo|catppuccin|nord|gruvbox)",
    },
    { type: "out", text: "  whoami        — about the developer" },
    { type: "out", text: "  skills        — list tech skills" },
    { type: "out", text: "  projects      — list projects" },
    { type: "out", text: "  contact       — show contact info" },
    { type: "out", text: "  github        — open GitHub profile" },
    { type: "out", text: "  dotnet build  — mock build" },
    { type: "out", text: "  dotnet run    — mock run" },
    { type: "out", text: "  ls            — list files" },
    { type: "out", text: "  clear         — clear terminal" },
  ],
  whoami: () => [
    { type: "out", text: `${resumeData.name} — ${resumeData.role}` },
    { type: "out", text: `📍 ${resumeData.location}` },
    { type: "out", text: `✉  ${resumeData.email}` },
  ],
  ls: () => [
    {
      type: "out",
      text: "home.tsx  about.html  projects.js  skills.json  training.ts  contact.css  README.md  Resume.pdf",
    },
  ],
  skills: () => [
    { type: "info", text: "Backend:  " + resumeData.skills.backend.join(", ") },
    {
      type: "info",
      text: "Frontend: " + resumeData.skills.frontend.join(", "),
    },
    {
      type: "info",
      text: "Database: " + resumeData.skills.database.join(", "),
    },
    { type: "info", text: "Tools:    " + resumeData.skills.tools.join(", ") },
  ],
  projects: () =>
    resumeData.projects.map((p) => ({
      type: "out" as const,
      text: `${p.emoji} ${p.title}`,
    })),
  contact: () => [
    { type: "out", text: `📞 ${resumeData.phone}` },
    { type: "out", text: `✉  ${resumeData.email}` },
    { type: "out", text: `💼 ${resumeData.linkedin}` },
    { type: "out", text: `🐙 ${resumeData.github}` },
  ],
  github: (_a, openFile) => {
    window.open(resumeData.github, "_blank");
    return [{ type: "info", text: "Opening GitHub profile..." }];
  },
  "dotnet build": () => [
    { type: "out", text: "Build started..." },
    {
      type: "out",
      text: "  Portfolio.csproj -> bin/Debug/net8.0/Portfolio.dll",
    },
    { type: "info", text: "Build succeeded. 0 Warning(s) 0 Error(s)" },
  ],
  "dotnet run": () => [
    { type: "out", text: "info: Now listening on: https://localhost:5001" },
    {
      type: "out",
      text: "info: Application started. Press Ctrl+C to shut down.",
    },
  ],
  "dotnet test": () => [
    { type: "out", text: "Starting test execution..." },
    {
      type: "info",
      text: "Passed! — Failed: 0, Passed: 12, Skipped: 0, Total: 12",
    },
  ],
};

const THEME_MAP: Record<string, string> = {
  dark: "mizan-dark",
  rosepine: "rose-pine",
  tokyo: "tokyo-night",
  catppuccin: "catppuccin",
  nord: "nord",
  gruvbox: "gruvbox",
};

type Props = {
  open: boolean;
  close: () => void;
  openFile?: (id: string) => void;
  setTheme?: (t: string) => void;
  pendingCommand?: string;
  onCommandRun?: () => void;
};

export default function Terminal({
  open,
  close,
  openFile,
  setTheme,
  pendingCommand,
  onCommandRun,
}: Props) {
  const [lines, setLines] = useState<Line[]>([
    {
      type: "info",
      text: "Mizanur's Portfolio Terminal — type 'help' for commands",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Focus input when terminal opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  // Run a pending command (from menubar) when terminal opens
  useEffect(() => {
    if (open && pendingCommand && pendingCommand.trim()) {
      const timer = setTimeout(() => {
        run(pendingCommand);
        if (onCommandRun) onCommandRun();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [open, pendingCommand]);

  const push = (newLines: Line[]) => setLines((prev) => [...prev, ...newLines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push([{ type: "cmd", text: `$ ${cmd}` }]);
    setHistory((prev) => [cmd, ...prev]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const [head, ...rest] = cmd.split(" ");
    if (head === "open" && rest[0]) {
      const valid = [
        "home",
        "about",
        "projects",
        "skills",
        "training",
        "contact",
        "readme",
      ];
      if (valid.includes(rest[0])) {
        openFile?.(rest[0]);
        push([{ type: "info", text: `Opening ${rest[0]}...` }]);
      } else {
        push([
          {
            type: "err",
            text: `File not found: ${rest[0]}. Valid: ${valid.join(", ")}`,
          },
        ]);
      }
      return;
    }
    if (head === "theme" && rest[0]) {
      const t = THEME_MAP[rest[0]];
      if (t) {
        setTheme?.(t);
        push([{ type: "info", text: `Theme changed to ${rest[0]}` }]);
      } else {
        push([
          {
            type: "err",
            text: `Unknown theme. Options: ${Object.keys(THEME_MAP).join(", ")}`,
          },
        ]);
      }
      return;
    }
    if (COMMANDS[cmd]) {
      push(COMMANDS[cmd](rest, openFile, setTheme));

      // Show toast for known commands
      if (cmd === "dotnet build") {
        toast("Build succeeded ✓", "success");
      } else if (cmd === "dotnet run") {
        toast("Application started", "info");
      } else if (cmd === "dotnet test") {
        toast("All tests passed", "success");
      } else if (cmd === "clear") {
        toast("Terminal cleared", "info");
      }
      return;
    }
    push([{ type: "err", text: `'${cmd}' is not recognized. Type 'help'.` }]);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    }
    if (e.key === "ArrowUp") {
      const i = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(i);
      setInput(history[i] ?? "");
    }
    if (e.key === "ArrowDown") {
      const i = Math.max(histIdx - 1, -1);
      setHistIdx(i);
      setInput(i === -1 ? "" : history[i]);
    }
  };

  const lineColor = (t: Line["type"]) =>
    t === "cmd"
      ? "text-[#4ec9b0]"
      : t === "err"
        ? "text-red-400"
        : t === "info"
          ? "text-[#569cd6]"
          : "text-zinc-400";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 200, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="bg-[#0d1117] border-t border-[#21262d] flex flex-col overflow-hidden flex-shrink-0"
        >
          {/* Header */}
          <div className="h-9 bg-[#161b22] border-b border-[#21262d] flex items-center justify-between px-4 flex-shrink-0">
            <div className="flex items-center gap-4 text-[12px] text-zinc-400">
              <span className="text-white">TERMINAL</span>
              <span className="text-zinc-600">PROBLEMS</span>
              <span className="text-zinc-600">OUTPUT</span>
            </div>
            <button
              onClick={close}
              className="text-zinc-500 hover:text-white transition"
            >
              <X size={15} />
            </button>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto px-4 py-2 font-mono text-[12px]"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((l, i) => (
              <div
                key={i}
                className={`mb-0.5 whitespace-pre-wrap leading-5 ${lineColor(l.type)}`}
              >
                {l.text}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#4ec9b0]">mizan@portfolio</span>
              <span className="text-[#569cd6]">:~/src$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent outline-none text-white font-mono text-[12px]"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
