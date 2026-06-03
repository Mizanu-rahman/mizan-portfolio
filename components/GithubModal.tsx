"use client";

import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { X } from "lucide-react";

type Event = {
  id: string;
  type: string;
  repo: string;
  date: string;
  url: string;
};

type Props = {
  open: boolean;
  close: () => void;
};

export default function GithubModal({ open, close }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.github.com/users/Mizanur-Rahmann/events/public?per_page=8",
        );
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();

        const formatted: Event[] = data.map((e: any) => ({
          id: e.id,
          type: e.type
            .replace("Event", "")
            .replace(/([A-Z])/g, " $1")
            .trim(),
          repo: e.repo.name,
          date: new Date(e.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          url: `https://github.com/${e.repo.name}`,
        }));

        setEvents(formatted);
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="bg-[var(--bg2)] border border-[var(--border)] rounded-xl shadow-2xl w-[480px] max-h-[500px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h2 className="flex items-center gap-2 text-sm font-semibold font-display text-[var(--text)]">
            <FaGithub size={16} />
            Recent GitHub Activity
          </h2>
          <button
            onClick={close}
            className="text-[var(--dim)] hover:text-[var(--text)]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto thin-scroll max-h-[380px] p-4 space-y-2">
          {loading ? (
            <p className="text-[var(--dim)] text-xs">Loading activity...</p>
          ) : events.length === 0 ? (
            <p className="text-[var(--dim)] text-xs">
              No recent activity found.
            </p>
          ) : (
            events.map((event) => (
              <a
                key={event.id}
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 py-2 px-3 rounded-md hover:bg-[var(--bg3)] transition-colors no-underline group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-[var(--text)] truncate group-hover:text-[var(--bright)]">
                    {event.repo}
                  </p>
                  <p className="text-[10px] text-[var(--dim)]">{event.type}</p>
                </div>
                <span className="text-[10px] text-[var(--dim)] flex-shrink-0">
                  {event.date}
                </span>
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] px-5 py-3">
          <a
            href="https://github.com/Mizanur-Rahmann"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-[var(--blue)] hover:text-[var(--bright)] transition-colors no-underline"
          >
            View full profile on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
