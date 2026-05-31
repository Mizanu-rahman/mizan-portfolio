"use client";
import useTypingText from "@/hooks/useTypingText";
import { resumeData } from "@/data/resumeData";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Globe } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
type Props = { setActiveFile: (f: string) => void };

const ROLE_TAGS = [
  { label: ".NET Developer", dot: "#4ec9b0" },
  { label: "Backend Enthusiast", dot: "#c586c0" },
  { label: "Full-Stack Learner", dot: "#4fc1ff" },
];

const SOCIALS = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: resumeData.github,
    color: "rgb(230,237,243)",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: resumeData.linkedin,
    color: "rgb(10,102,194)",
  },
  {
    icon: MdEmail,
    label: "Email",
    href: `mailto:${resumeData.email}`,
    color: "rgb(78,201,176)",
  },
  {
    icon: FaXTwitter,
    label: "X",
    href: "https://x.com/mizanism_",
    color: "rgb(79,193,255)",
  },
];

export default function HomePage({ setActiveFile }: Props) {
  const typed = useTypingText();

  return (
    <div className="home-wrapper">
      <div className="home-content">
        {/* Comment */}
        <p className="text-vscode-green text-sm mb-2.5 opacity-0 animate-su-1">
          /* hello world !! Welcome to my portfolio 💜 */
        </p>

        {/* Name + Avatar row */}
        <div className="flex items-center gap-4 mb-3.5 opacity-0 animate-su-2">
          <h1
            className="font-display font-extrabold leading-none text-vscode-bright tracking-[-2.5px]"
            style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
          >
            Mizanur
            <br />
            <em className="not-italic gradient-name relative">
              Rahman
              <span
                className="absolute bottom-[-2px] left-0 right-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, var(--pink), transparent)",
                }}
              />
            </em>{" "}
          </h1>

          {/* Avatar circle — with glow ring */}
        </div>

        {/* Role tags */}
        <div className="flex flex-wrap gap-2 mb-4 opacity-0 animate-su-3">
          {ROLE_TAGS.map((t) => (
            <div
              key={t.label}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs border rounded-sm bg-white/[0.03] hover:border-white/20 transition-colors border-white/10`}
            >
              <span
                className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                style={{ background: t.dot }}
              />
              {t.label}
            </div>
          ))}
        </div>

        {/* Typing tagline */}
        <p className="text-sm text-vscode-dim mb-5 min-h-[25px] opacity-0 animate-su-3">
          {typed}
          <span className="text-vscode-pink animate-blink">|</span>
        </p>

        {/* Bio */}
        <p className="text-[14px] text-vscode-dim leading-[1.9] max-w-[520px] mb-7 opacity-0 animate-su-4">
          I live at the crossroads of{" "}
          <strong className="text-vscode-blue font-medium">
            backend development
          </strong>
          ,{" "}
          <strong className="text-vscode-blue font-medium">
            clean architecture
          </strong>
          ,and{" "}
          <strong className="text-vscode-blue font-medium">
            frontend exploration
          </strong>
          .I build systems that are genuinely{" "}
          <strong className="text-vscode-blue font-medium">
            well‑structured and maintainable
          </strong>
          .
        </p>

        {/* CTAs */}
        <div className="flex gap-2.5 flex-wrap opacity-0 animate-su-5">
          <button
            onClick={() => setActiveFile("projects")}
            className="inline-flex items-center gap-2 px-5 py-2 border border-white/14 text-vscode-text text-xs font-mono rounded-sm hover:border-white/35 transition-colors"
          >
            📁 Projects
          </button>
          <button
            onClick={() => setActiveFile("about")}
            className="inline-flex items-center gap-2 px-5 py-2 border border-white/14 text-vscode-text text-xs font-mono rounded-sm hover:border-white/35 transition-colors"
          >
            👤 About Me
          </button>
          <button
            onClick={() => setActiveFile("contact")}
            className="inline-flex items-center gap-2 px-5 py-2 border border-white/14 text-vscode-text text-xs font-mono rounded-sm hover:border-white/35 transition-colors"
          >
            ✉ Contact
          </button>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-4 gap-px mt-12 border border-vscode-border rounded overflow-hidden opacity-0 animate-su-6"
          style={{ maxWidth: 820 }}
        >
          {[
            ["1+", "Years"],
            ["10+", "Projects"],
            ["∞", "Curiosity"],
            ["↑", "Always Learning"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="px-4 py-4 bg-white/[0.02] text-center hover:bg-white/[0.04] transition-colors"
            >
              <span className="font-display text-[22px] font-extrabold text-vscode-bright block mb-0.5">
                {n}
              </span>
              <span className="text-[10px] text-vscode-dim uppercase tracking-widest">
                {l}
              </span>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex gap-2 mt-6 flex-wrap opacity-0 animate-su-7">
          {SOCIALS.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-vscode-border rounded-sm text-vscode-dim text-xs transition-all no-underline hover:border-white/20 hover:text-vscode-text"
            >
              <span
                style={{
                  color,
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={14} />
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
