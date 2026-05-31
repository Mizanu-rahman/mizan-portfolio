"use client";
import {
  Files,
  Search,
  GitBranch,
  Download,
  Sparkles,
  Settings,
} from "lucide-react";
import { RefObject } from "react";

type Props = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  openPalette: () => void;
  toggleCopilot: () => void;
  openSettings: () => void;
  containerRef: RefObject<HTMLDivElement | null>;
};

export default function ActivityBar({
  sidebarOpen,
  toggleSidebar,
  openPalette,
  toggleCopilot,
  openSettings,
  containerRef,
}: Props) {
  return (
    <div
      ref={containerRef}
      className="bg-vscode-bg4 flex flex-col items-center pt-1 border-r border-vscode-border gap-0.5"
      style={{ gridArea: "act" }}
    >
      <button
        title="Explorer"
        onClick={toggleSidebar}
        className={`relative w-11 h-11 flex items-center justify-center rounded-md transition-colors duration-150 border-none outline-none ${sidebarOpen ? "text-white ab-active" : "text-white/40 hover:text-white/85 hover:bg-white/[0.05]"}`}
      >
        <Files size={22} />
      </button>
      <button
        title="Search (Ctrl+P)"
        onClick={openPalette}
        className="relative w-11 h-11 flex items-center justify-center rounded-md transition-colors duration-150 border-none outline-none text-white/40 hover:text-white/85 hover:bg-white/[0.05]"
      >
        <Search size={22} />
      </button>
      <button
        title="Source Control"
        onClick={() =>
          alert(
            "⎇ main  ↑1 ✦3\n\nStaged changes:\n  M home.tsx\n  M about.html\n\nRecent commits:\n  Add training page\n  Add projects page\n  Initial portfolio setup",
          )
        }
        className="relative w-11 h-11 flex items-center justify-center rounded-md transition-colors duration-150 border-none outline-none text-white/40 hover:text-white/85 hover:bg-white/[0.05]"
      >
        <GitBranch size={22} />
      </button>
      <button
        title="Download Resume"
        onClick={() =>
          window.open("https://github.com/Mizanur-Rahmann", "_blank")
        }
        className="relative w-11 h-11 flex items-center justify-center rounded-md transition-colors duration-150 border-none outline-none text-white/40 hover:text-white/85 hover:bg-white/[0.05]"
      >
        <Download size={20} />
      </button>
      <button
        title="Mizan's Copilot Chat"
        onClick={toggleCopilot}
        className="relative w-11 h-11 flex items-center justify-center rounded-md transition-colors duration-150 border-none outline-none text-white/40 hover:text-white/85 hover:bg-white/[0.05]"
      >
        <Sparkles size={20} />
      </button>

      <div className="flex-1" />

      <button
        title="Settings"
        onClick={openSettings}
        className="relative w-11 h-11 flex items-center justify-center rounded-md transition-colors duration-150 border-none outline-none text-white/40 hover:text-white/85 hover:bg-white/[0.05] mb-1"
      >
        <Settings size={20} />
      </button>
    </div>
  );
}
