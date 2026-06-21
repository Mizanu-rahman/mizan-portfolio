"use client";

import { useEffect, useState } from "react";

export default function LastUpdated() {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    fetch("/last-updated.json")
      .then((res) => res.json())
      .then((data) => setDate(data.updated))
      .catch(() => setDate(null));
  }, []);

  if (!date) return null;

  return (
    <span className="text-[11px] opacity-70 whitespace-nowrap">
      🕒 Updated {date}
    </span>
  );
}
