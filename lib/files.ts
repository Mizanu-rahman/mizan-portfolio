import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiTypescript,
  SiMarkdown,
} from "react-icons/si";
import { VscJson } from "react-icons/vsc";
import { FaFilePdf, FaCss3Alt } from "react-icons/fa";

export const files = [
  {
    id: "home",
    name: "home.tsx",
    gitStatus: "M",
    type: "tsx",
    icon: SiReact,
    color: "#61dafb",
  },
  {
    id: "about",
    name: "about.html",

    type: "html",
    icon: SiHtml5,
    color: "#e34c26",
  },
  {
    id: "projects",
    name: "projects.js",
    gitStatus: "A",

    type: "js",
    icon: SiJavascript,
    color: "#f7df1e",
  },
  {
    id: "skills",
    name: "skills.json",
    type: "json",
    icon: VscJson,
    color: "#cbcb41",
  },
  {
    id: "training",
    name: "training.ts",
    gitStatus: "U",

    type: "ts",
    icon: SiTypescript,
    color: "#3178c6",
  },
  {
    id: "contact",
    name: "contact.css",
    type: "css",
    icon: FaCss3Alt,
    color: "#264de4",
  },
  {
    id: "resume",
    name: "Resume.pdf",
    type: "pdf",
    icon: FaFilePdf,
    color: "#f44747",
  },
];
