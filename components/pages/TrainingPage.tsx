"use client";

import { resumeData } from "@/data/resumeData";

export default function TrainingPage() {
  const { training } = resumeData;

  return (
    <div className="pane-enter h-full overflow-y-auto thin-scroll py-6 px-12">
      {/* Comment */}
      <p className="text-vscode-green text-sm mb-2 font-mono italic animate-su-1">
        // training.ts — where I leveled up
      </p>

      {/* Title */}
      <h1 className="font-display text-[40px] font-extrabold tracking-[-2.5px] text-vscode-bright mb-1 animate-su-2">
        Training
      </h1>

      {/* Subtitle */}
      <p className="text-vscode-green text-[13px] mb-8 font-mono opacity-90 animate-su-3">
        $ dotnet test TrainingModule —788 hours passed{" "}
      </p>

      {/* ── Wrapper to limit width (same as About cards) ── */}
      <div className="max-w-[820px]">
        {/* Main training card */}
        <div
          className="skill-card p-6 mb-8 animate-su-4"
          style={{ "--card-accent": "var(--blue2)" } as React.CSSProperties}
        >
          <div className="flex items-start gap-4 mb-4">
            <span className="text-2xl">🎓</span>
            <div>
              <h2 className="sc-title mb-1">{training.title}</h2>
              <p className="text-[12px] text-vscode-dim">
                {training.subtitle} · {training.provider}
              </p>
            </div>
          </div>

          <ul className="space-y-2 mt-4">
            {training.points.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[13px] text-vscode-dim"
              >
                <span className="text-vscode-blue2 mt-0.5 flex-shrink-0">
                  ▸
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* References heading */}
        <h3 className="sc-title mb-4 animate-su-5">References</h3>

        {/* References grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-su-6">
          {training.references.map((ref, i) => (
            <div
              key={ref.name}
              className="skill-card p-5"
              style={
                {
                  "--card-accent": i === 0 ? "var(--green)" : "var(--purple)",
                } as React.CSSProperties
              }
            >
              <div className="text-[15px] font-semibold text-vscode-bright mb-1">
                {ref.name}
              </div>
              <div className="text-[12px] text-vscode-dim mb-3">{ref.role}</div>
              <div className="text-[12px] text-vscode-dim flex flex-col gap-0.5">
                <span>📞 {ref.phone}</span>
                <span>✉ {ref.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
