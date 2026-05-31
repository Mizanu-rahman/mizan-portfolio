"use client";

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { resumeData } from "@/data/resumeData";

const ACCENT_COLORS = [
  "var(--blue2)",
  "var(--green)",
  "var(--purple)",
  "var(--orange)",
  "var(--yellow)",
  "var(--pink)",
];

export default function ProjectsPage() {
  return (
    <div className="pane-enter h-full overflow-y-auto thin-scroll py-6 px-12">
      {/* Comment */}
      <p className="text-vscode-green text-sm mb-2 font-mono italic animate-su-1">
        // projects.js : things I&apos;ve built
      </p>

      {/* Title – exactly like About Me */}
      <h1 className="font-display text-[40px] font-extrabold tracking-[-2.5px] text-vscode-bright mb-1 animate-su-2">
        Projects
      </h1>

      {/* Subtitle – a real code line */}
      <p className="text-vscode-green text-[13px] mb-8 font-mono opacity-90 animate-su-3">
        Project myProject = new Project();
      </p>

      {/* Projects grid – same style as skills cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumeData.projects.map((project, i) => {
          const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];

          return (
            <div
              key={project.id}
              className="skill-card p-6 flex flex-col animate-su-4"
              style={
                {
                  "--card-accent": accent,
                  animationDelay: `${0.28 + i * 0.07}s`,
                } as React.CSSProperties
              }
            >
              {/* Top row: title + type badge */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="sc-title mb-0 leading-tight">{project.title}</h3>
                <span
                  className="shrink-0 inline-flex items-center px-3 py-1 text-[11px] rounded-sm border"
                  style={{
                    borderColor: accent,
                    color: accent,
                    background: `${accent}10`,
                  }}
                >
                  {project.type}
                </span>
              </div>

              {/* Description */}
              <p className="text-[13px] text-vscode-dim leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              {/* Stack tags */}
              <div className="tags mb-5">
                {project.stack.slice(0, 5).map((tech) => (
                  <span key={tech} className="stag">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 5 && (
                  <span className="stag">+{project.stack.length - 5}</span>
                )}
              </div>

              {/* Links – simple outline buttons */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {project.githubLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-sm border border-vscode-border text-vscode-text hover:border-white/35 transition-colors no-underline"
                  >
                    <FaGithub size={13} />
                    {link.label}
                  </a>
                ))}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-sm border border-vscode-border text-vscode-text hover:border-white/35 transition-colors no-underline"
                  >
                    <FaExternalLinkAlt size={12} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
