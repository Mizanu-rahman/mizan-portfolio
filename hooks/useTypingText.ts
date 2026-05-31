"use client";
import { useEffect, useState } from "react";
import { resumeData } from "@/data/resumeData";

export default function useTypingText() {
  const phrases = resumeData.taglines;
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const current = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.substring(0, displayText.length + 1);
        setDisplayText(next);
        if (next === current) { setIsPaused(true); setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1800); }
      } else {
        const next = current.substring(0, displayText.length - 1);
        setDisplayText(next);
        if (next === "") { setIsDeleting(false); setPhraseIndex((p) => (p + 1) % phrases.length); }
      }
    }, isDeleting ? 35 : 65);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, isPaused, phrases]);

  return displayText;
}
