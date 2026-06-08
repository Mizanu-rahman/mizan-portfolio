"use client";

import { useEffect, useRef, useState } from "react";

// Scroll‑triggered skill‑bar animation (already present, keep it)
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function SkillCard({
  accent,
  title,
  children,
}: {
  accent: string;
  title: string;
  children: React.ReactNode;
}) {
  const [ref, inView] = useInView(0.25);
  return (
    <div
      ref={ref}
      className={`skill-card ${inView ? "bars-animate" : ""}`}
      style={{ "--card-accent": accent } as React.CSSProperties}
    >
      <div className="sc-title">{title}</div>
      {children}
    </div>
  );
}

// Progress bar helper
function Bar({
  label,
  pct,
  color,
  delay = 0,
}: {
  label: string;
  pct: number;
  color: string;
  delay?: number;
}) {
  return (
    <div className="sbar">
      <div className="sbar-header">
        <span>{label}</span>
      </div>
      <div className="sbar-track">
        <div
          className="sbar-fill"
          style={{
            width: `${pct}%`,
            background: color,
            animationDelay: `${delay}s`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsPage() {
  // Colour palettes
  const languageColors = {
    csharp: "#9b59b6",
    javascript: "#f1c40f",
    typescript: "#3498db",
    sql: "#e74c3c",
  };
  const backendColors = {
    dotnet: "#3498db",
    nodejs: "#2ecc71",
    efcore: "#1abc9c",
    webapi: "#9b59b6",
    auth: "#e67e22",
  };
  const frontendColors = {
    react: "#61dafb",
    angular: "#dd0031",
    typescript: "#3498db",
    tailwind: "#06b6d4",
    bootstrap: "#7952b3",
  };
  const toolsColors = {
    git: "#f1502f",
    docker: "#2496ed",
    postman: "#ff6c37",
    swagger: "#85ea2d",
    vscode: "#007acc",
  };

  return (
    <div className="pane-enter h-full overflow-y-auto thin-scroll py-6 px-12">
      {/* ── Animated header ── */}
      <p className="text-vscode-green text-sm mb-2 font-mono italic animate-su-1">
        // skills.json — tech stack & tools
      </p>

      <p className="text-[11px] uppercase tracking-[0.25em] text-vscode-dim mb-3 animate-su-2"></p>

      <h1 className="font-display text-[40px] font-extrabold tracking-[-2.5px] text-vscode-bright mb-2 animate-su-2">
        Skills
      </h1>

      <p className="text-vscode-green text-[13px] mb-10 font-mono opacity-90 animate-su-3">
        {`{ "status": "always_learning", "passion": "immeasurable" }`}
      </p>

      {/* ── Skill cards with staggered animation ── */}
      <div className="skills-grid-fixed">
        <div className="animate-su-4">
          <SkillCard accent="#3498db" title="Language">
            <Bar label="C#" pct={82} color={languageColors.csharp} />
            <Bar
              label="JavaScript"
              pct={75}
              color={languageColors.javascript}
              delay={0.1}
            />
            <Bar
              label="TypeScript"
              pct={71}
              color={languageColors.typescript}
              delay={0.2}
            />
            <Bar label="SQL" pct={85} color={languageColors.sql} delay={0.3} />
          </SkillCard>
        </div>

        <div className="animate-su-4" style={{ animationDelay: "0.12s" }}>
          <SkillCard accent="#2ecc71" title="Backend">
            <Bar label="ASP.NET Core" pct={92} color={backendColors.dotnet} />
            <Bar
              label="Node.js / Express"
              pct={78}
              color={backendColors.nodejs}
              delay={0.1}
            />
            <Bar
              label="Entity Framework Core"
              pct={75}
              color={backendColors.efcore}
              delay={0.2}
            />
            <Bar
              label="Web API / Auth"
              pct={80}
              color={backendColors.webapi}
              delay={0.3}
            />
          </SkillCard>
        </div>

        <div className="animate-su-4" style={{ animationDelay: "0.2s" }}>
          <SkillCard accent="#e91e63" title="Frontend">
            <Bar label="React" pct={70} color={frontendColors.react} />
            <Bar
              label="Angular"
              pct={75}
              color={frontendColors.angular}
              delay={0.1}
            />
            <Bar
              label="HTML/CSS"
              pct={80}
              color={frontendColors.typescript}
              delay={0.2}
            />
            <Bar
              label="Tailwind / Bootstrap"
              pct={75}
              color={frontendColors.tailwind}
              delay={0.3}
            />
          </SkillCard>
        </div>

        <div className="animate-su-4" style={{ animationDelay: "0.28s" }}>
          <SkillCard accent="#f39c12" title="Tools & Others">
            <Bar label="Git / GitHub" pct={77} color={toolsColors.git} />
            <Bar
              label="Docker"
              pct={60}
              color={toolsColors.docker}
              delay={0.1}
            />
            <Bar
              label="Postman"
              pct={81}
              color={toolsColors.postman}
              delay={0.2}
            />
            <Bar
              label="Swagger / OpenAPI"
              pct={83}
              color={toolsColors.swagger}
              delay={0.3}
            />
          </SkillCard>
        </div>
      </div>

      {/* Also familiar with */}
      <div className="mt-12 animate-su-5">
        <div className="sc-title mb-4">Also familiar with</div>
        <div className="tags">
          <span className="stag">MongoDB</span>

          <span className="stag">Next.js</span>
          <span className="stag">Express</span>
          <span className="stag">GraphQL</span>
          <span className="stag">Microservices</span>
          <span className="stag">WebSockets</span>
        </div>
      </div>
    </div>
  );
}
