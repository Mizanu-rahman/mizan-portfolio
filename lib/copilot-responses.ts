import { resumeData } from "@/data/resumeData";

// ── Helper: random item ──
function r<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Context memory (exported so CopilotPanel can use it) ──
export let lastTopic = "";
export function setLastTopic(topic: string) {
  lastTopic = topic;
}

// ── Format helpers ──
const eduList = resumeData.education
  .map((e) => `• ${e.degree} – ${e.institution}`)
  .join("\n");

const projectList = resumeData.projects
  .map((p) => `**${p.title}** – ${p.description.split(".")[0]}.`)
  .join("\n\n");

const skillSummary = `
**Backend:** ${resumeData.skills.backend.join(", ")}
**Frontend:** ${resumeData.skills.frontend.join(", ")}
**Database:** ${resumeData.skills.database.join(", ")}
**Tools:** ${resumeData.skills.tools.join(", ")}`.trim();

const trainingDetail = `${resumeData.training.title}\n${resumeData.training.subtitle}\nProvider: ${resumeData.training.provider}\n\nKey points:\n${resumeData.training.points.map((p) => `▸ ${p}`).join("\n")}`;

// ── Main reply generator ──
export function generateReply(msg: string): string {
  const q = msg.toLowerCase().trim();

  // ── GREETINGS ──
  if (/^(hello|hi|hey|sup|yo|good\s(morning|afternoon|evening))/i.test(q)) {
    setLastTopic("greeting");
    return r([
      `👋 Hey there! I'm Mizanur's portfolio assistant. Ask me anything – his skills, projects, education, or how to reach him!`,
      `Hi! I'm here to help you learn about Mizanur. What would you like to know?`,
      `Hello! I can tell you about Mizanur's work, background, or even his favorite projects. Just ask!`,
    ]);
  }

  // ── ABOUT / WHO ──
  if (/(who|about)\s.*(mizan|he|him)|tell me about/i.test(q)) {
    setLastTopic("about");
    return `${resumeData.name} is a **${resumeData.role}** based in ${resumeData.location} 🇧🇩. He's passionate about building clean, scalable software and is actively open to work.\n\nHe completed an intensive full‑stack training (IsDB‑BISEW) and has built multiple real‑world projects. Want to know more about his skills or projects?`;
  }

  // ── SKILLS ──
  if (/skill|tech|stack|language|know|framework|tool/i.test(q)) {
    setLastTopic("skills");
    return `Here's Mizanur's current tech stack:\n\n${skillSummary}\n\nHe's also experienced with **JWT, SignalR, Crystal Reports, FastReport, Cloudinary, Socket.IO** and more. Which area would you like to dive deeper into?`;
  }

  // ── PROJECTS ──
  if (/project|built|work|portfolio|app/i.test(q)) {
    setLastTopic("projects");
    return `Mizanur has built **${resumeData.projects.length} projects** so far:\n\n${projectList}\n\nYou can ask for more details on any specific project!`;
  }

  // ── SPECIFIC PROJECT (by keyword) ──
  for (const p of resumeData.projects) {
    const keywords = p.title.toLowerCase().split(" ");
    if (keywords.some((w) => q.includes(w.substring(0, 5)))) {
      setLastTopic(p.id);
      const links = p.githubLinks
        .map((l) => `[${l.label}](${l.url})`)
        .join(" · ");
      return `**${p.title}** (${p.type})\n${p.description}\n\nTech: ${p.stack.join(", ")}\nLinks: ${links}${p.live ? `\nLive: ${p.live}` : ""}`;
    }
  }

  // ── TRAINING ──
  if (/train|bootcamp|isdb|scholarship|course|class/i.test(q)) {
    setLastTopic("training");
    return trainingDetail;
  }

  // ── EDUCATION ──
  if (/stud|college|university|school|education|degree|physics/i.test(q)) {
    setLastTopic("education");
    return `Mizanur's academic journey:\n\n${eduList}\n\nHe transitioned from Physics to software development — a unique path that gives him strong analytical thinking.`;
  }

  // ── CONTACT ──
  if (/contact|email|phone|reach|hire|connect/i.test(q)) {
    setLastTopic("contact");
    return `You can reach Mizanur at:\n📞 ${resumeData.phone}\n✉ ${resumeData.email}\n💼 ${resumeData.linkedin}\n🐙 ${resumeData.github}\n🌐 ${resumeData.website}`;
  }

  // ── LOCATION ──
  if (/where|location|live|city|country/i.test(q)) {
    setLastTopic("location");
    return `Mizanur lives in **${resumeData.location}** 🇧🇩. He's open to remote work and relocation.`;
  }

  // ── STATUS / AVAILABILITY ──
  if (/open|available|hire|job|freelance/i.test(q)) {
    setLastTopic("status");
    return `Mizanur is **open to work** — full‑time, freelance, or remote. Feel free to reach out!`;
  }

  // ── REFERENCES ──
  if (/reference|recommend|vouch/i.test(q)) {
    setLastTopic("references");
    return resumeData.training.references
      .map((r) => `**${r.name}** – ${r.role}\n📞 ${r.phone} · ✉ ${r.email}`)
      .join("\n\n");
  }

  // ── FOLLOW‑UP / TELL ME MORE ──
  if (/tell me more|go on|elaborate|details|more info/i.test(q)) {
    if (!lastTopic)
      return "Sure! What would you like me to elaborate on? Skills, projects, or something else?";
    // Re‑trigger the appropriate intent with a generic message
    return generateReply(lastTopic);
  }

  // ── THEME / UI ──
  if (/theme|color|dark|light|appearance/i.test(q)) {
    return `You can change the color theme by clicking the theme name in the bottom status bar, or via the Settings gear icon. There are several beautiful themes to try!`;
  }

  // ── THANK YOU ──
  if (/thank|thx|appreciate/i.test(q)) {
    return r([
      "You're welcome! 😊",
      "Glad I could help!",
      "Anytime! Mizanur is awesome.",
    ]);
  }

  // ── FALLBACK ──
  return r([
    `I can tell you about Mizanur's **skills**, **projects**, **training**, **education**, or **contact info**. What would you like to know?`,
    `I'm not sure I understand, but try asking about his projects, skills, or background!`,
    `I'm here to help! Ask me something like "What projects has he built?" or "Where did he study?"`,
  ]);
}
