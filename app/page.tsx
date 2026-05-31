"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Cursor from "@/components/Cursor";
import CommandPalette from "@/components/CommandPalette";
import CopilotPanel from "@/components/CopilotPanel";
import Topbar from "@/components/layout/Topbar";
import Menubar from "@/components/layout/Menubar";
import ActivityBar from "@/components/layout/ActivityBar";
import Sidebar from "@/components/layout/Sidebar";
import Editor from "@/components/layout/Editor";
import Terminal from "@/components/Terminal";
import Statusbar from "@/components/layout/Statusbar";
import SettingsModal from "@/components/SettingsModal";
import SplashScreen from "@/components/SplashScreen";
import { ToastProvider } from "@/lib/toast-context";
import { files } from "@/lib/files";

export default function Page() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [activeFile, setActiveFile] = useState("home");
  const [openTabs, setOpenTabs] = useState(["home"]);
  const [theme, setTheme] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const actBarRef = useRef<HTMLDivElement>(null);
  const [pendingCommand, setPendingCommand] = useState<string>("");
  const [copilotMessage, setCopilotMessage] = useState<string>("");
  const [splashDone, setSplashDone] = useState(false);
  const [pageZoom, setPageZoom] = useState(1);

  const zoomIn = () => setPageZoom((prev) => Math.min(prev + 0.1, 2.0));
  const zoomOut = () => setPageZoom((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setPageZoom(1);

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const clearTerminal = () => {
    setTerminalOpen(false);
    setTimeout(() => setTerminalOpen(true), 50);
  };

  const runTerminalCommand = (command: string) => {
    setPendingCommand(command);
    if (terminalOpen) {
      setTerminalOpen(false);
      setTimeout(() => setTerminalOpen(true), 100);
    } else {
      setTerminalOpen(true);
    }
  };

  const sendCopilotMessage = (message: string) => {
    setCopilotMessage(message);
    setCopilotOpen(true);
  };

  useEffect(() => {
    const html = document.documentElement;
    if (theme) html.setAttribute("data-theme", theme);
    else html.removeAttribute("data-theme");
  }, [theme]);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 768;
    }
    return false;
  });
  const openFile = useCallback((id: string) => {
    if (id === "resume") {
      window.open("https://github.com/Mizanur-Rahmann", "_blank");
      return;
    }
    setActiveFile(id);
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);
  const closeTab = useCallback(
    (id: string) => {
      setOpenTabs((prev) => {
        const next = prev.filter((t) => t !== id);
        return next.length ? next : ["home"];
      });
      if (activeFile === id) {
        const remaining = openTabs.filter((t) => t !== id);
        setActiveFile(
          remaining.length ? remaining[remaining.length - 1] : "home",
        );
      }
    },
    [activeFile, openTabs],
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((p) => !p);
      }
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen((p) => !p);
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setCopilotOpen((p) => !p);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const gridClass = [
    "app-grid",
    sidebarOpen ? "sidebar-open" : "sidebar-closed",
    copilotOpen ? "copilot-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!splashDone) {
    return (
      <ToastProvider>
        <SplashScreen onFinish={() => setSplashDone(true)} />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <Cursor />
      {/* ── Mobile top bar ── */}
      <div className="mobile-topbar">
        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen((p) => !p)}
        >
          ☰
        </button>
        <span className="mobile-page-title">
          {files.find((f) => f.id === activeFile)?.name || "home.tsx"}
        </span>{" "}
        <div className="mobile-topbar-right">
          <button
            className="mobile-copilot-btn"
            onClick={() => setCopilotOpen((p) => !p)}
          >
            ✦
          </button>
          <button
            className="mobile-palette-btn"
            onClick={() => setPaletteOpen(true)}
          >
            ⌘
          </button>
        </div>
      </div>
      <CommandPalette
        open={paletteOpen}
        close={() => setPaletteOpen(false)}
        openFile={openFile}
        toggleTerminal={() => setTerminalOpen((p) => !p)}
        toggleSidebar={() => setSidebarOpen((p) => !p)}
        toggleCopilot={() => setCopilotOpen((p) => !p)}
        setTheme={setTheme}
        currentTheme={theme}
      />
      <SettingsModal
        open={settingsOpen}
        close={() => setSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        openCommandPalette={() => setPaletteOpen(true)}
        toggleTerminal={() => setTerminalOpen((p) => !p)}
        toggleCopilot={() => setCopilotOpen((p) => !p)}
        triggerRef={actBarRef}
      />
      <div className={gridClass} style={{ zoom: pageZoom }}>
        <Topbar openCommandPalette={() => setPaletteOpen(true)} />

        <Menubar
          openCommandPalette={() => setPaletteOpen(true)}
          openFile={openFile}
          toggleTerminal={() => setTerminalOpen((p) => !p)}
          toggleSidebar={() => setSidebarOpen((p) => !p)}
          clearTerminal={clearTerminal}
          runTerminalCommand={runTerminalCommand}
          toggleCopilot={() => setCopilotOpen((p) => !p)}
          sendCopilotMessage={sendCopilotMessage}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          resetZoom={resetZoom}
          toggleFullscreen={toggleFullscreen}
        />

        <ActivityBar
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen((p) => !p)}
          openPalette={() => setPaletteOpen(true)}
          toggleCopilot={() => setCopilotOpen((p) => !p)}
          openSettings={() => setSettingsOpen((prev) => !prev)}
          containerRef={actBarRef}
        />

        <Sidebar
          sidebarOpen={sidebarOpen}
          activeFile={activeFile}
          setActiveFile={openFile}
          toggleCopilot={() => setCopilotOpen((p) => !p)}
          openSettings={() => setSettingsOpen(true)}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <div
          className="flex flex-col overflow-hidden bg-vscode-bg"
          style={{ gridArea: "editor" }}
        >
          <Editor
            activeFile={activeFile}
            setActiveFile={openFile}
            openTabs={openTabs}
            closeTab={closeTab}
          />
          <Terminal
            open={terminalOpen}
            close={() => setTerminalOpen(false)}
            openFile={openFile}
            setTheme={setTheme}
            pendingCommand={pendingCommand}
            onCommandRun={() => setPendingCommand("")}
          />
        </div>

        <CopilotPanel open={copilotOpen} close={() => setCopilotOpen(false)} />

        <Statusbar
          activeFile={activeFile}
          theme={theme}
          setTheme={setTheme}
          toggleTerminal={() => setTerminalOpen((p) => !p)}
          openPalette={() => setPaletteOpen(true)}
        />
      </div>
    </ToastProvider>
  );
}
