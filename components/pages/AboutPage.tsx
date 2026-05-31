"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export default function AboutPage() {
  const [imgError, setImgError] = useState(false);

  const focusPoints = [
    {
      icon: "🔭",
      text: "Deepening knowledge of SQL Server — queries, stored procedures, optimization",
    },
    {
      icon: "🛠️",
      text: " Getting comfortable with Git, GitHub, and CI/CD workflows",
    },
    {
      icon: "🤖",
      text: "Curious about adding simple AI features to applications",
    },
    { icon: "📚", text: "Studying clean architecture" },
    {
      icon: "🔄",
      text: " Understanding middleware, dependency injection, and the .NET request pipeline",
    },
    {
      icon: "✨",
      text: "Exploring frontend integration with React and TypeScript",
    },
  ];

  return (
    <div className="pane-enter h-full overflow-y-auto thin-scroll py-6 px-12">
      {/* Comment */}
      <p className="text-vscode-green text-base mb-2 font-mono italic animate-su-1">
        {`←!-- about.html - Mizanur Rahman -→`}
      </p>

      {/* Title row – title + avatar beside it, no huge gap */}
      <div className="flex items-start gap-6 mb-5 animate-su-2">
        <div>
          {/* Title */}
          <h1 className="font-display text-[40px] font-extrabold tracking-[-2.5px] text-vscode-bright mb-1">
            About Me
          </h1>
          {/* Subtitle */}
          <p className="text-vscode-green text-[13px] font-mono opacity-90">
            // who I am · what I do · what I'm learning
          </p>
        </div>

        {/* Avatar (120px, ring & glow always visible) */}
        <div
          className="home-avatar flex-shrink-0"
          style={{ width: 120, height: 120, marginLeft: 0 }}
        >
          <div className="avatar-ring" />
          <div className="avatar-glow" />
          <div className="avatar-inner">
            {!imgError ? (
              <img
                src="/avatar.png"
                alt="Mizanur Rahman"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="font-display text-[2rem] font-extrabold text-vscode-pink">
                MR
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── INTRO CARD ── */}
      <div
        className="skill-card mb-6 py-6 px-5 max-w-[820px] animate-su-4"
        style={{ "--card-accent": "var(--blue2)" } as React.CSSProperties}
      >
        <p className="text-[15px] leading-[1.8] text-vscode-dim">
          Hi! I'm{" "}
          <strong className="text-vscode-blue font-medium">
            {resumeData.name}
          </strong>
          , a full‑stack .NET developer from {resumeData.location}.I love
          building systems that are not just functional but
          <strong className="text-vscode-blue font-medium">
            {" "}
            intelligent and scalable
          </strong>
          . Bring a curious, analytical mind to everything I create.
        </p>
      </div>

      {/* ── CURRENT FOCUS ── */}
      <div
        className="skill-card mb-6 py-6 px-5 max-w-[820px] animate-su-5"
        style={{ "--card-accent": "var(--green)" } as React.CSSProperties}
      >
        <h2 className="sc-title mb-4">Current Focus</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {focusPoints.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="text-[13px] text-vscode-dim leading-relaxed">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── EDUCATION ── */}
      <div
        className="skill-card py-6 px-5 max-w-[820px] animate-su-6"
        style={{ "--card-accent": "var(--purple)" } as React.CSSProperties}
      >
        <h2 className="sc-title mb-5">Education</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resumeData.education.map((edu, i) => (
            <div
              key={i}
              className="flex gap-3 items-start border border-vscode-border bg-vscode-bg3/20 rounded-sm p-4"
            >
              <span className="text-vscode-blue2 flex-shrink-0 mt-0.5">
                <GraduationCap size={20} />
              </span>
              <div>
                <div className="text-[14px] font-semibold text-vscode-bright leading-tight mb-0.5">
                  {edu.degree}
                </div>
                <div className="text-[12px] text-vscode-dim">
                  {edu.institution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
