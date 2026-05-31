"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Toast = {
  id: number;
  message: string;
  type?: "info" | "success" | "warning";
};

type ToastContextType = {
  toast: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: Toast["type"] = "info") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-4 z-[10000] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="px-4 py-2.5 rounded-md shadow-lg text-[12px] font-medium pointer-events-auto animate-[slideIn_0.3s_ease]"
            style={{
              background:
                t.type === "success"
                  ? "var(--green)"
                  : t.type === "warning"
                    ? "var(--orange)"
                    : "var(--blue2)",
              color: "#fff",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
