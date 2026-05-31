"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { resumeData } from "@/data/resumeData";

/* ── SYSTEM PROMPT (unchanged from your working version) ── */
const SYSTEM_PROMPT = `
You are Mizan's AI Copilot — a helpful, friendly assistant embedded inside
his VS Code-themed developer portfolio. Answer questions about Mizanur Rahman
concisely. Use short paragraphs or bullet points. Use **bold** sparingly.

Here is everything you know about Mizanur Rahman:

NAME: ${resumeData.name}
ROLE: ${resumeData.role}
LOCATION: ${resumeData.location}
EMAIL: ${resumeData.email}
PHONE: ${resumeData.phone}
GITHUB: ${resumeData.github}
LINKEDIN: ${resumeData.linkedin}
WEBSITE: ${resumeData.website}

ABOUT: ${resumeData.about}

SKILLS:
- Backend: ${resumeData.skills.backend.join(", ")}
- Frontend: ${resumeData.skills.frontend.join(", ")}
- Database: ${resumeData.skills.database.join(", ")}
- Tools: ${resumeData.skills.tools.join(", ")}

PROJECTS:
${resumeData.projects
  .map(
    (p) =>
      `• ${p.emoji} ${p.title} (${p.type}): ${p.description} Stack: ${p.stack.join(", ")}. GitHub: ${p.githubLinks.map((l) => l.url).join(", ")}`,
  )
  .join("\n")}

TRAINING: ${resumeData.training.title}. ${resumeData.training.subtitle}.
Provider: ${resumeData.training.provider}.
${resumeData.training.points.join("; ")}

EDUCATION:
${resumeData.education.map((e) => `${e.degree} — ${e.institution}`).join("\n")}

STATUS: Open to work — full-time, freelance, and remote.

Rules:
- Keep answers to 2-4 sentences or 3-5 bullets max.
- If asked unrelated questions, politely redirect to portfolio topics.
- If asked about contact, give email and LinkedIn.
- If asked about projects, mention GitHub links.
`.trim();

/* ── LOCAL FALLBACK (unchanged from your working version) ── */
function localFallback(q: string): string {
  const ql = q.toLowerCase();
  if (/hello|hi |hey/.test(ql))
    return "👋 Hi! I'm Mizanur's Copilot. Ask me about his skills, projects, training, or how to contact him!";
  if (/skill|tech|stack|language/.test(ql))
    return `**Backend:** C#, ASP.NET Core, Web API, EF Core, Node.js\n**Frontend:** React, TypeScript, Angular, Tailwind\n**Database:** SQL Server, MongoDB\n**Tools:** Git, Postman, Swagger`;
  if (/project|built|github|work/.test(ql))
    return `Mizan has 6 real projects:\n• 📚 Smart Library System (React + .NET 8 + Angular)\n• 🔐 Order Management (ASP.NET Core MVC)\n• 🛒 Real-Time E-Commerce (Node.js + Socket.IO)\n• 🛍️ MERN E-Commerce (React + MongoDB)\n• 🖥️ Course Management (WinForms)\n• 🏪 E-Commerce Store (ASP.NET MVC 5)\n\ngithub.com/Mizanur-Rahmann`;
  if (/contact|email|phone|hire|reach/.test(ql))
    return `📞 ${resumeData.phone}\n✉ ${resumeData.email}\n💼 linkedin.com/in/mizanur-rahman-developer\n🐙 github.com/Mizanur-Rahmann`;
  if (/train|isdb|scholarship|bisew/.test(ql))
    return `IsDB-BISEW IT Scholarship Round 67 — 10-month intensive training, 700+ hours coding C#, ASP.NET Core, Angular, React, MSSQL.`;
  if (/educat|degree|physics|university/.test(ql))
    return `MSc in Physics & BSc in Physics from Chittagong College. He transitioned from Physics to software development!`;
  if (/locat|where|bangladesh|chattogram/.test(ql))
    return `Mizan is based in **Chattogram, Bangladesh** 🇧🇩. Open to remote and relocation.`;
  return `I can answer about Mizan's **skills**, **projects**, **training**, **education**, or **contact info**. What would you like to know?`;
}

/* ── GEMINI API CALL (unchanged from your working version) ── */
async function callGemini(
  history: { role: "user" | "model"; text: string }[],
  userMessage: string,
  apiKey: string,
): Promise<string> {
  const contents = [
    ...history.map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ];

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      maxOutputTokens: 400,
      temperature: 0.75,
      topP: 0.9,
    },
  };

  const models = [
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.0-flash-lite",
  ];

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      continue;
    }

    if (res.status === 429) continue;
    if (res.status === 400) {
      const err = await res.json().catch(() => ({}));
      console.error("Gemini 400 error:", JSON.stringify(err));
      return "⚠️ Invalid API key format. Please check your `.env.local` file.";
    }
    if (res.status === 403) {
      return "⚠️ API key not authorised. Make sure you enabled the Generative Language API in Google AI Studio.";
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error(`Gemini ${res.status} error:`, JSON.stringify(err));
      continue;
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    if (text.trim()) return text.trim();
  }

  return localFallback(userMessage);
}

/* ── TYPING ANIMATION COMPONENT ── */
function TypingText({
  text,
  onComplete,
}: {
  text: string;
  onComplete: () => void;
}) {
  const [display, setDisplay] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplay("");

    const interval = setInterval(() => {
      setDisplay(text.substring(0, indexRef.current + 1));
      indexRef.current++;
      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setTimeout(onComplete, 200);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: display
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/\n/g, "<br>"),
      }}
    />
  );
}

/* ── COMPONENT ── */
type Msg = { role: "user" | "bot"; text: string };
type Props = { open: boolean; close: () => void };

const SUGGESTIONS = [
  "What are Mizanur's main skills?",
  "Tell me about his projects",
  "How can I contact him?",
  "What training did he complete?",
];

export default function CopilotPanel({ open, close }: Props) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"unknown" | "active" | "no-key">(
    "unknown",
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
    const keySet = key.length > 10 && key !== "your_gemini_api_key_here";
    setApiStatus(keySet ? "active" : "no-key");

    setMsgs([
      {
        role: "bot",
        text: keySet
          ? "👋 Hi! I'm Mizan's AI Copilot. Ask me anything about his skills, projects, training, or how to get in touch!"
          : "👋 Hi! I'm Mizan's Copilot. Ask me anything about his skills, projects, training, or contact info!\n\n*(Running in offline mode — add a Gemini API key for smarter answers)*",
      },
    ]);
  }, []);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, loading, typingText]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const handleTypingComplete = useCallback((fullText: string) => {
    setMsgs((prev) => [...prev, { role: "bot", text: fullText }]);
    setTypingText(null);
  }, []);

  const send = async () => {
    const q = input.trim();
    if (!q || loading || typingText) return;
    setInput("");

    const userMsg: Msg = { role: "user", text: q };
    setMsgs((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      let reply: string;

      const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
      const keySet = key.length > 10 && key !== "your_gemini_api_key_here";

      if (keySet) {
        const history = msgs.slice(1).map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("model" as const),
          text: m.text,
        }));
        reply = await callGemini(history, q, key);
      } else {
        await new Promise((r) => setTimeout(r, 400));
        reply = localFallback(q);
      }

      setTypingText(reply);
    } catch (err) {
      console.error("CopilotPanel error:", err);
      const fallback = localFallback(q);
      setTypingText(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      if (loading || typingText) return;
      setInput("");
      setMsgs((prev) => [...prev, { role: "user", text: suggestion }]);
      setLoading(true);

      const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
      const keySet = key.length > 10 && key !== "your_gemini_api_key_here";

      (keySet
        ? callGemini([], suggestion, key)
        : new Promise<string>((r) =>
            setTimeout(() => r(localFallback(suggestion)), 400),
          )
      )
        .then((reply) => {
          setTypingText(reply);
        })
        .catch(() => {
          setTypingText(localFallback(suggestion));
        })
        .finally(() => setLoading(false));
    },
    [loading, typingText],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!open) return <div style={{ gridArea: "cop", width: 0 }} />;

  return (
    <div
      className="flex flex-col bg-vscode-bg2 overflow-hidden animate-fade-in"
      style={{ gridArea: "cop", borderLeft: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span className="flex items-center gap-2 text-[12px] font-semibold text-vscode-bright">
          <Sparkles size={13} style={{ color: "#9370db" }} />
          Mizanur's Copilot
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: apiStatus === "active" ? "#4ec9b0" : "#777",
              display: "inline-block",
            }}
            title={apiStatus === "active" ? "Gemini AI active" : "Offline mode"}
          />
        </span>
        <button
          onClick={close}
          className="text-vscode-dim hover:text-vscode-bright transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={bodyRef}
        className="flex-1 overflow-y-auto thin-scroll p-3 flex flex-col gap-2"
      >
        {msgs.map((m, i) => (
          <div
            key={i}
            className={[
              "max-w-[95%] text-[12px] leading-relaxed rounded-lg px-3 py-2",
              m.role === "user"
                ? "self-end bg-vscode-blue2 text-white"
                : "self-start bg-white/[0.06] border border-white/[0.08] text-vscode-text",
            ].join(" ")}
            style={{ whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{
              __html: m.text
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br>"),
            }}
          />
        ))}

        {/* Typing animation */}
        {typingText && (
          <div className="self-start bg-white/[0.06] border border-white/[0.08] text-vscode-text text-[12px] leading-relaxed rounded-lg px-3 py-2 max-w-[95%]">
            <TypingText
              text={typingText}
              onComplete={() => handleTypingComplete(typingText)}
            />
          </div>
        )}

        {/* Thinking dots */}
        {loading && !typingText && (
          <div className="self-start flex items-center gap-1 px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] rounded-lg">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-vscode-dim block"
                style={{
                  animation: `blink 1.4s ${i * 0.22}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Suggestions */}
      {msgs.length <= 1 && !loading && !typingText && (
        <div className="px-3 pb-2 flex flex-col gap-1.5 flex-shrink-0">
          <p className="text-[10px] text-vscode-dim uppercase tracking-widest mb-0.5">
            Try asking
          </p>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestionClick(s)}
              className="text-left text-[11px] text-vscode-dim hover:text-vscode-blue border border-vscode-border hover:border-vscode-blue2 px-3 py-1.5 rounded transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        className="p-2 flex gap-2 flex-shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask about Mizan…"
          rows={1}
          disabled={loading || !!typingText}
          className="flex-1 bg-vscode-bg3 border border-vscode-border text-vscode-text placeholder:text-vscode-dim text-[12px] px-3 py-2 rounded outline-none focus:border-vscode-blue2 transition-colors font-mono resize-none disabled:opacity-50"
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading || !!typingText}
          className="bg-vscode-blue2 text-white w-9 h-9 flex items-center justify-center rounded hover:opacity-85 transition-opacity disabled:opacity-30 flex-shrink-0"
        >
          <Send size={14} />
        </button>
      </div>

      {/* Footer */}
      <div className="px-3 pb-1.5 text-[10px] text-vscode-dim text-center flex-shrink-0">
        {apiStatus === "active"
          ? "Powered by Google Gemini 2.0 Flash."
          : "Offline mode · Add NEXT_PUBLIC_GEMINI_API_KEY to .env.local for AI"}
      </div>
    </div>
  );
}
