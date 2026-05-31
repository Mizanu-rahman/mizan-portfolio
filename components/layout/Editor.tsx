"use client";

import { files } from "@/lib/files";
import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import ProjectsPage from "@/components/pages/ProjectsPage";
import SkillsPage from "@/components/pages/SkillsPage";
import TrainingPage from "@/components/pages/TrainingPage";
import ContactPage from "@/components/pages/ContactPage";

type Props = {
  activeFile: string;
  setActiveFile: (f: string) => void;
  openTabs: string[];
  closeTab: (f: string) => void;
};

export default function Editor({
  activeFile,
  setActiveFile,
  openTabs,
  closeTab,
}: Props) {
  const renderPage = () => {
    switch (activeFile) {
      case "home":
        return <HomePage setActiveFile={setActiveFile} />;
      case "about":
        return <AboutPage />;
      case "projects":
        return <ProjectsPage />;
      case "skills":
        return <SkillsPage />;
      case "training":
        return <TrainingPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage setActiveFile={setActiveFile} />;
    }
  };

  const activeFileData = files.find((f) => f.id === activeFile);

  return (
    /* NO extra wrapper div — this div IS the editor area, no gap possible */
    <div className="flex flex-col bg-vscode-bg overflow-hidden flex-1 min-h-0">
      {/* ── TABS ── */}
      <div
        className="hidden md:flex bg-vscode-bg2 border-b border-vscode-border overflow-x-auto no-scroll flex-shrink-0"
        style={{ height: 35 }}
      >
        {" "}
        {openTabs.map((tabId) => {
          const file = files.find((f) => f.id === tabId);
          if (!file) return null;
          const Icon = file.icon;
          const isActive = activeFile === tabId;
          return (
            <div
              key={file.id}
              onClick={() => setActiveFile(file.id)}
              className={[
                "relative flex items-center gap-1.5 px-3.5 h-full text-xs border-r border-vscode-border flex-shrink-0 max-w-[160px] group transition-colors duration-100",
                isActive
                  ? "tab-active bg-vscode-bg text-vscode-bright"
                  : "bg-vscode-bg2 text-vscode-dim hover:text-vscode-text",
              ].join(" ")}
              style={{ cursor: "none" }}
            >
              {/* Colored icon in tab */}
              <span className="flex-shrink-0 flex items-center">
                <Icon size={13} style={{ color: file.color }} />
              </span>
              <span className="truncate">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (tabId !== "home") closeTab(file.id);
                }}
                className={[
                  "ml-0.5 w-4 h-4 flex items-center justify-center rounded text-[11px] flex-shrink-0 transition-all text-vscode-dim hover:bg-white/10 hover:text-vscode-text",
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100",
                ].join(" ")}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* ── BREADCRUMB ── h-[26px] exactly, no padding-top/bottom that creates gap */}
      <div
        className="hidden md:flex items-center gap-0.5 px-4 text-xs text-vscode-dim border-b border-vscode-border bg-vscode-bg flex-shrink-0"
        style={{ height: 26, minHeight: 26 }}
      >
        {" "}
        {["mizanur-rahman", "src", activeFileData?.name ?? "home.tsx"].map(
          (seg, i, arr) => (
            <span key={seg} className="flex items-center gap-0.5">
              <span
                draggable
                className={[
                  "px-1 rounded transition-colors",
                  i === arr.length - 1 ? "text-vscode-text" : "text-vscode-dim",
                ].join(" ")}
                style={{ cursor: "grab" }}
              >
                {seg}
              </span>
              {i < arr.length - 1 && (
                <span className="opacity-30 text-[10px] pointer-events-none">
                  ›
                </span>
              )}
            </span>
          ),
        )}
      </div>

      {/* ── PAGE CONTENT — takes remaining height ── */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden thin-scroll">
        <div className="pane-enter" key={activeFile}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
