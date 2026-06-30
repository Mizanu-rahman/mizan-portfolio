"use client";

import { useEffect } from "react";

export default function FaviconAnimator() {
  useEffect(() => {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    document.head.appendChild(favicon);

    let toggle = true;
    const interval = setInterval(() => {
      favicon.href = toggle ? "/favicon-1.svg" : "/favicon-2.svg";
      toggle = !toggle;
    }, 1500);

    return () => {
      clearInterval(interval);
      document.head.removeChild(favicon);
    };
  }, []);

  return null;
}
