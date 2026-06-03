"use client";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  close: () => void;
  title: string;
  src: string;
};

export default function ProjectDemoModal({ open, close, title, src }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="bg-[var(--bg2)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden max-w-[850px] w-[95%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text)] truncate">
            {title}
          </h3>
          <button
            onClick={close}
            className="text-[var(--dim)] hover:text-[var(--text)]"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-2">
          <img src={src} alt={title} className="w-full rounded" />
        </div>
      </div>
    </div>
  );
}
