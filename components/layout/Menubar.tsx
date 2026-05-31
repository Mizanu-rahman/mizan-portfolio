"use client";

import { useToast } from "@/lib/toast-context";
import { useState, useRef, useEffect } from "react";

type Props = {
  openCommandPalette: () => void;
  openFile: (id: string) => void;
  toggleTerminal: () => void;
  toggleSidebar: () => void;
  // New props for enhanced features
  clearTerminal: () => void;
  runTerminalCommand: (command: string) => void;
  toggleCopilot: () => void;
  sendCopilotMessage: (message: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  toggleFullscreen: () => void;
};

const MENUS: Record<
  string,
  { label: string; shortcut?: string; action?: string }[]
> = {
  File: [
    { label: "New Tab", shortcut: "Ctrl+T", action: "newTab" },
    { label: "---" },
    { label: "Download Resume", shortcut: "Ctrl+S", action: "downloadResume" },
    { label: "---" },
    { label: "Close Window", shortcut: "Alt+F4", action: "closeWindow" },
  ],
  Edit: [
    { label: "Find File", shortcut: "Ctrl+P", action: "palette" },
    { label: "Find in Files", shortcut: "Ctrl+Shift+F", action: "findInFiles" },
    { label: "---" },
    { label: "Command Palette", shortcut: "Ctrl+Shift+P", action: "palette" },
  ],
  View: [
    { label: "Toggle Sidebar", shortcut: "Ctrl+B", action: "sidebar" },
    { label: "Toggle Terminal", shortcut: "Ctrl+`", action: "terminal" },
    { label: "---" },
    { label: "Zoom In", action: "zoomIn" },
    { label: "Zoom Out", action: "zoomOut" },
    { label: "Reset Zoom", action: "resetZoom" },
    { label: "---" },
    { label: "Enter Full Screen", action: "fullscreen" },
  ],
  Go: [
    { label: "Go to home.tsx", action: "home" },
    { label: "Go to about.html", action: "about" },
    { label: "Go to projects.js", action: "projects" },
    { label: "Go to skills.json", action: "skills" },
    { label: "Go to training.ts", action: "training" },
    { label: "Go to contact.css", action: "contact" },
  ],
  Run: [
    { label: "Build Project", shortcut: "Ctrl+Shift+B", action: "runBuild" },
    { label: "Start Debugging", shortcut: "F5", action: "runDebug" },
    { label: "---" },
    { label: "Run Tests", action: "runTests" },
  ],
  Terminal: [
    { label: "New Terminal", shortcut: "Ctrl+`", action: "terminal" },
    { label: "Clear Terminal", action: "clearTerminal" },
  ],
  Help: [
    { label: "Command Palette", shortcut: "Ctrl+Shift+P", action: "palette" },
    { label: "---" },
    { label: "Keyboard Shortcuts" },
    { label: "Ctrl P", shortcut: "→ Command Palette" },
    { label: "Ctrl `", shortcut: "→ Toggle Terminal" },
    { label: "Ctrl B", shortcut: "→ Toggle Sidebar" },
    { label: "Ctrl Shift C", shortcut: "→ Copilot Chat" },
    { label: "Esc", shortcut: "→ Close Overlay" },
    { label: "↑ / ↓", shortcut: "→ Terminal History" },
    { label: "---" },
    { label: "---" },
    { label: "About This Portfolio", action: "aboutPortfolio" },
  ],
  Copilot: [
    {
      label: "Copilot Chat",
      shortcut: "Ctrl+Shift+C",
      action: "toggleCopilot",
    },
    { label: "---" },
    { label: "About Copilot", action: "aboutCopilot" },
  ],
};

export default function Menubar({
  openCommandPalette,
  openFile,
  toggleTerminal,
  toggleSidebar,
  clearTerminal,
  runTerminalCommand,
  toggleCopilot,
  sendCopilotMessage,
  zoomIn,
  zoomOut,
  resetZoom,
  toggleFullscreen,
}: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Mizanur_Rahman_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAction = (action?: string) => {
    setOpenMenu(null);
    if (!action) return;

    // File
    if (action === "newTab") {
      openFile("home");
      return;
    }
    if (action === "downloadResume") {
      downloadResume();
      toast("Resume downloaded ✓", "success");
      return;
    }
    if (action === "closeWindow") {
      alert("Window close is disabled in browser.\nTry Alt+F4 😄");
      return;
    }

    // Edit
    if (action === "palette") {
      openCommandPalette();
      return;
    }
    if (action === "findInFiles") {
      openCommandPalette();
      return;
    }

    // View
    if (action === "sidebar") {
      toggleSidebar();
      return;
    }
    if (action === "terminal") {
      toggleTerminal();
      return;
    }
    if (action === "zoomIn") {
      zoomIn();
      return;
    }
    if (action === "zoomOut") {
      zoomOut();
      return;
    }
    if (action === "resetZoom") {
      resetZoom();
      return;
    }
    if (action === "fullscreen") {
      toggleFullscreen();
      toast("Fullscreen toggled", "info");
      return;
    }

    // Go – all file opens
    if (
      ["home", "about", "projects", "skills", "training", "contact"].includes(
        action,
      )
    ) {
      openFile(action);
      return;
    }

    // Run
    if (action === "runBuild") {
      toggleTerminal();
      toast("Build started…", "info");
      setTimeout(() => runTerminalCommand("dotnet build"), 200);
      return;
    }
    if (action === "runDebug") {
      toggleTerminal();
      toast("Debug session started", "info");
      setTimeout(() => runTerminalCommand("dotnet run"), 200);
      return;
    }
    if (action === "runTests") {
      toggleTerminal();
      toast("Running tests…", "info");
      setTimeout(() => runTerminalCommand("dotnet test"), 200);
      return;
    }

    // Terminal
    if (action === "clearTerminal") {
      clearTerminal();
      return;
    }

    // Help
    if (action === "aboutPortfolio") {
      alert(
        "🖥️ Mizan's Portfolio\n" +
          "Built with:\n" +
          "• Next.js 16 + React\n" +
          "• TypeScript\n" +
          "• Tailwind CSS\n" +
          "• Framer Motion\n" +
          "© 2026 Mizanur Rahman",
      );
      return;
    } // Copilot
    if (action === "toggleCopilot") {
      toggleCopilot();
      return;
    }
    if (action === "aboutCopilot") {
      alert(
        "🤖 Mizan's AI Copilot\n" +
          "Powered by Google Gemini 2.0 Flash\n" +
          "This AI assistant knows everything about Mizan \n" +
          "Ask anything like:\n" +
          "• What are his skills?\n" +
          "• Tell me about his projects\n" +
          "• How can I contact him?\n" +
          "• Where did he study?",
      );
      return;
    }
    if (action === "explainPortfolio") {
      toggleCopilot();
      setTimeout(
        () => sendCopilotMessage("Explain what this portfolio does"),
        300,
      );
      return;
    }
    if (action === "suggestImprovements") {
      toggleCopilot();
      setTimeout(
        () => sendCopilotMessage("Suggest improvements for this portfolio"),
        300,
      );
      return;
    }
  };

  return (
    <div
      ref={menuRef}
      className="bg-vscode-bg3 flex items-center gap-0.5 px-2 border-b border-vscode-border select-none"
      style={{ gridArea: "menu", height: 22 }}
    >
      {Object.entries(MENUS).map(([name, items]) => (
        <div key={name} className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === name ? null : name)}
            className={`px-2 py-0.5 rounded text-xs transition-colors cursor-none ${
              openMenu === name
                ? "bg-vscode-blue2 text-white"
                : "text-vscode-text hover:bg-vscode-blue2 hover:text-white"
            }`}
          >
            {name}
          </button>
          {openMenu === name && (
            <div
              className={`absolute top-full left-0 mt-0.5 bg-vscode-bg3 border border-vscode-border rounded shadow-2xl z-50 py-0.5 ${
                name === "Help" ? "min-w-[280px]" : "min-w-[220px]"
              }`}
            >
              {items.map((item, i) =>
                item.label === "---" ? (
                  <div key={i} className="my-1 border-t border-vscode-border" />
                ) : (
                  <button
                    key={i}
                    onClick={() => handleAction(item.action)}
                    className="w-full flex items-center justify-between px-4 py-1.5 text-[12px] text-vscode-text hover:bg-vscode-blue2 hover:text-white transition text-left gap-8 group cursor-none"
                  >
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && (
                      <span className="text-[11px] flex-shrink-0 opacity-60 group-hover:opacity-100">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
