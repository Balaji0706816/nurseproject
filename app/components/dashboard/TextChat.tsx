// components/stampley/TextChat.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, Send, RotateCcw } from "lucide-react";

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: number;
};

type ChatMeta = {
  domain: string;
  day: number;
  distressScore: number;
  missedDay?: boolean;
  endOfWeek?: boolean;
};

function uid() {
  return `m_${Math.random().toString(16).slice(2)}`;
}

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function toHistory(messages: ChatMsg[]) {
  return messages.slice(-20).map(({ role, text, createdAt }) => ({
    role,
    text,
    createdAt,
  }));
}

export default function TextChat({
  className,
  endpoint = "/api/chat",
  initialAssistantMessage = "Hi — I’m Stampley. What’s on your mind today?",
  placeholder = "Message Stampley…",
  mockUrl = "/mock/stampley-chat.json",
  meta = { domain: "Emotional", day: 1, distressScore: 5 },
  height = "full", // ✅ NEW
}: {
  className?: string;
  endpoint?: string;
  initialAssistantMessage?: string;
  placeholder?: string;
  mockUrl?: string;
  meta?: ChatMeta;
  height?: "full" | "auto";
}) {
  const initialState = (): ChatMsg[] => [
    { id: uid(), role: "assistant", text: initialAssistantMessage, createdAt: Date.now() },
  ];

  const [messages, setMessages] = useState<ChatMsg[]>(initialState);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") =>
    requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior }));

  // Load mock transcript in dev only
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let cancelled = false;

    async function loadMock() {
      try {
        const res = await fetch(mockUrl, { cache: "no-store" });
        if (!res.ok) return;

        const data: unknown = await res.json();
        if (cancelled) return;

        if (
          typeof data === "object" &&
          data !== null &&
          "messages" in data &&
          Array.isArray((data as any).messages)
        ) {
          const next = (data as any).messages as ChatMsg[];
          if (next.length > 0) setMessages(next);
          scrollToBottom("auto");
        }
      } catch {
        // ignore
      }
    }

    void loadMock();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mockUrl]);

  async function send() {
    const text = draft.trim();
    if (!text || sending) return;

    setSending(true);

    const userMsg: ChatMsg = {
      id: uid(),
      role: "user",
      text,
      createdAt: Date.now(),
    };

    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setDraft("");
    scrollToBottom();

    try {
      const payload = { text, meta, messages: toHistory(nextMessages) };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = res.ok ? await res.json() : { reply: "" };

      const replyText =
        (data?.reply as string) || "Thanks for sharing. What part felt the most difficult?";

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", text: replyText, createdAt: Date.now() },
      ]);

      scrollToBottom();
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", text: "Network error. Please try again.", createdAt: Date.now() },
      ]);
      scrollToBottom();
    } finally {
      setSending(false);
    }
  }

  function resetChat() {
    setMessages(initialState());
    setDraft("");
    scrollToBottom("auto");
  }

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col",
        // ✅ default: fill parent
        height === "full" ? "h-full" : "h-[clamp(420px,70dvh,780px)]",
        className
      )}
    >
      {/* Transcript */}
      <div className={cn("flex-1 min-h-0 overflow-y-auto bg-white scrollbar-light")}>
        <div className="mx-auto w-full max-w-3xl px-3 pb-6 pt-4 space-y-4">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    "shadow-[0_1px_0_rgba(15,23,42,0.04)]",
                    isUser
                      ? "bg-slate-900 text-white rounded-br-md"
                      : "border border-slate-200 bg-white text-slate-800 rounded-bl-md"
                  )}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Composer (stays visible) */}
      <div className="border-t border-slate-200 bg-white px-3 py-3">
        <div className="mx-auto flex w-full max-w-3xl items-end gap-2">
          <button
            type="button"
            onClick={resetChat}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            aria-label="Reset chat"
            title="Reset chat"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <input
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            placeholder={placeholder}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />

          <button
            type="button"
            onClick={() => void send()}
            disabled={sending || !draft.trim()}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:opacity-50"
            aria-label="Send"
            title="Send"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-light {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.35) transparent;
        }
        .scrollbar-light::-webkit-scrollbar {
          width: 10px;
        }
        .scrollbar-light::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-light::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.28);
          border-radius: 999px;
          border: 3px solid rgba(255, 255, 255, 0.95);
        }
        .scrollbar-light::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.45);
        }
      `}</style>
    </div>
  );
}
