"use client";

// import { files } from "@/lib/files";
import { GitBranch } from "lucide-react";
import { files } from "@/lib/files"; // adjust if your export is different

type Props = {
  sidebarOpen: boolean;
  activeFile: string;
  setActiveFile: (id: string) => void;
  toggleCopilot: () => void;
  openSettings: () => void;
  closeSidebar: () => void;
};

export default function Sidebar({
  sidebarOpen,
  activeFile,
  setActiveFile,
  toggleCopilot,
  openSettings,
  closeSidebar,
}: Props) {
  if (!sidebarOpen) return <div style={{ gridArea: "side" }} />;

  const handleResume = () => {
    // Download the actual CV HTML as a file
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // put your PDF here, or use the HTML CV
    link.download = "Mizanur_Rahman_CV.pdf";
    link.click();
  };

  return (
    <div
      className="bg-vscode-bg2 border-r border-vscode-border flex flex-col overflow-hidden select-none"
      style={{ gridArea: "side" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-1.5">
        <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-vscode-text">
          Portfolio
        </div>
        <div className="mobile-sidebar-close flex items-center gap-2">
          <button
            onClick={openSettings}
            className="text-vscode-dim hover:text-vscode-text text-lg"
          >
            ⚙
          </button>

          <button
            onClick={() => closeSidebar()}
            className="text-vscode-dim hover:text-vscode-text text-lg"
          >
            ✕
          </button>
        </div>{" "}
      </div>
      {/* Close button (mobile only) */}
      {/* File list */}
      <div className="flex-1 overflow-y-auto thin-scroll pb-1">
        {files.map((file) => {
          const Icon = file.icon;
          const isActive = activeFile === file.id;
          const isResume = file.id === "resume";

          return (
            <button
              key={file.id}
              title={file.name}
              onClick={() =>
                isResume ? handleResume() : setActiveFile(file.id)
              }
              className={[
                "w-full flex items-center gap-2 px-4 py-[5px] text-xs border-l-2 transition-all duration-100 group",
                isActive
                  ? "bg-white/[0.07] text-vscode-bright border-vscode-blue2"
                  : isResume
                    ? "text-vscode-dim border-transparent hover:bg-white/[0.05] hover:text-[#f44747] hover:border-[#f44747]"
                    : "text-vscode-dim border-transparent hover:bg-white/[0.05] hover:text-vscode-text",
              ].join(" ")}
            >
              {/* Icon — always render with correct colour, never inherit */}
              <span
                className="flex-shrink-0 flex items-center"
                style={{ lineHeight: 1 }}
              >
                <Icon
                  size={14}
                  style={{ color: isResume ? "#f44747" : file.color }}
                />
              </span>

              <span className="truncate flex-1">{file.name}</span>
              {file.gitStatus && (
                <span
                  className="ml-auto text-[10px] font-bold flex-shrink-0"
                  style={{
                    color:
                      file.gitStatus === "M"
                        ? "var(--orange)"
                        : file.gitStatus === "U"
                          ? "var(--green)"
                          : file.gitStatus === "A"
                            ? "var(--blue)"
                            : "var(--dim)",
                  }}
                >
                  {file.gitStatus}
                </span>
              )}
              {isResume && (
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  ↓
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Copilot button — exact Aahana style */}
      <div
        className="px-3 py-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <button
          onClick={toggleCopilot}
          title="Open Mizan's Copilot (Ctrl+Shift+C)"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 10px",
            borderRadius: 6,
            border: "1px solid rgba(110,64,201,0.25)",
            background: "rgba(110,64,201,0.07)",
            boxShadow: "rgba(110,64,201,0.1) 0 0 8px",
            cursor: "none",
            transition: "background .15s",
          }}
        >
          <span
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9370db"
              strokeWidth="2"
            >
              <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
            </svg>
            <span
              className="sidebar-pulse"
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgb(110,64,201)",
              }}
            />
          </span>
          <span
            style={{
              flex: 1,
              fontSize: 11.5,
              fontWeight: 500,
              color: "rgb(147,112,219)",
              textAlign: "left",
            }}
          >
            Mizan's Copilot
          </span>
          <span style={{ fontSize: 9, color: "var(--dim)" }}>AI</span>
        </button>
      </div>
      {/* Git status */}
      <div className="border-t border-vscode-border px-3 py-1.5 flex items-center gap-1.5 text-[11px] text-vscode-dim">
        <GitBranch size={12} />
        <span className="text-vscode-text">main</span>
        <div className="ml-auto flex gap-2">
          <span className="text-vscode-gcm">↑1</span>
          <span className="text-vscode-orange">✦3</span>
        </div>
      </div>
    </div>
  );
}
