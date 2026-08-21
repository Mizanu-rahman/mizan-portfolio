"use client";

import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaCode,
} from "react-icons/fa";
import { resumeData } from "@/data/resumeData";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const socials = [
    {
      icon: FaPhoneAlt,
      label: "Phone",
      value: resumeData.phone,
      href: `tel:${resumeData.phone}`,
      color: "#34d399",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: resumeData.email,
      href: `mailto:${resumeData.email}`,
      color: "#60a5fa",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/mizanur-rahman-developer/",
      href: resumeData.linkedin,
      color: "#0ea5e9",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "github.com/Mizanu-Rahman",
      href: resumeData.github,
      color: "#c084fc",
    },
    {
      icon: FaXTwitter,
      label: "X",
      value: "x.com/mizanism_",
      href: "https://x.com/mizanism_",
      color: "#f472b6",
    },
    {
      icon: FaCode,
      label: "LeetCode",
      value: "mizanurrahman",
      href: "https://leetcode.com/mizanurrahman",
      color: "#fbbf24",
    },
  ];

  return (
    <div className="pane-enter h-full overflow-y-auto thin-scroll py-6 px-12">
      {/* Comment */}
      <p className="text-vscode-green text-sm mb-2 font-mono italic animate-su-1">
        /* contact.css — let&apos;s build something */
      </p>

      {/* Title */}
      <h1 className="font-display text-[40px] font-extrabold tracking-[-2.5px] text-vscode-bright mb-1 animate-su-2">
        Contact
      </h1>

      {/* Subtitle */}
      <p className="text-vscode-green text-[13px] mb-8 font-mono opacity-90 animate-su-3">
        // open to work, collabs &amp; good conversations
      </p>

      {/* Two‑column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1000px]">
        {/* LEFT – social links */}
        <div className="space-y-3 animate-su-4">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#38bdf8] mb-3">
            Reach Me At
          </h3>

          {socials.map(({ icon: Icon, label, value, href, color }) => (
            <a
              key={label}
              href={href}
              target={
                label.includes("Phone") || label.includes("Email")
                  ? undefined
                  : "_blank"
              }
              rel="noreferrer"
              className="flex items-center gap-4 px-5 py-4 rounded-sm border border-vscode-border bg-vscode-bg2/50 hover:border-vscode-blue2 transition-colors group no-underline"
            >
              <span style={{ color }} className="flex-shrink-0">
                <Icon size={18} />
              </span>
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.1em] font-bold mb-0.5"
                  style={{ color }}
                >
                  {label}
                </div>
                <div className="text-[13px] text-vscode-bright group-hover:text-white transition-colors">
                  {value}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* RIGHT – contact form */}
        <div className="animate-su-5">
          <div
            className="skill-card p-6"
            style={{ "--card-accent": "var(--green)" } as React.CSSProperties}
          >
            <h3 className="sc-title mb-5 text-vscode-green">Send a Message</h3>

            {status === "sent" ? (
              <div className="text-vscode-green text-[13px] py-6">
                ✅ Message sent! I&apos;ll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[15px] text-vscode-dim mb-1">
                    // Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-vscode-bg3 border border-vscode-border text-vscode-text placeholder:text-vscode-dim/60 text-xs px-3 py-2 rounded outline-none focus:border-vscode-blue2 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[15px] text-vscode-dim mb-1">
                    // Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="your@mail.com"
                    className="w-full bg-vscode-bg3 border border-vscode-border text-vscode-text placeholder:text-vscode-dim/60 text-xs px-3 py-2 rounded outline-none focus:border-vscode-blue2 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[15px] text-vscode-dim mb-1">
                    // Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="whats on your mind..."
                    className="w-full bg-vscode-bg3 border border-vscode-border text-vscode-text placeholder:text-vscode-dim/60 text-xs px-3 py-2 rounded outline-none focus:border-vscode-blue2 transition-colors font-mono resize-none"
                  />
                </div>
                {status === "error" && (
                  <p className="text-[#f44747] text-[11px]">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-vscode-green text-white text-xs font-mono italic py-2 rounded hover:opacity-85 transition-opacity disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>
                <p className="text-[white] text-[11px]">
                  // Powered by Formspree(lands directly in my Inbox)();
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
