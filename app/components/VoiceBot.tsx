// components/stampley/VoiceBot.tsx
"use client";

import React, { useRef, useState } from "react";
import { Loader2, Mic, MicOff, Volume2, Sparkles } from "lucide-react";

type VoiceTurn = {
  id: string;
  role: "user" | "assistant";
  transcript?: string;
  audioUrl?: string;
  createdAt: number;
};

function uid() {
  return `m_${Math.random().toString(16).slice(2)}`;
}

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function CoachAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
      <Sparkles className="h-5 w-5" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm">
      <span className="text-sm font-semibold">You</span>
    </div>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const left = side === "left";
  return (
    <div className={cn("flex gap-3", left ? "justify-start" : "justify-end")}>
      {left ? <CoachAvatar /> : null}
      <div className={cn("w-full max-w-[640px]", left ? "" : "flex flex-col items-end")}>
        <div
          className={cn(
            "rounded-3xl border px-4 py-3 shadow-sm",
            left
              ? "border-slate-200 bg-white text-slate-800"
              : "border-slate-900 bg-slate-900 text-white"
          )}
        >
          {children}
        </div>
      </div>
      {!left ? <UserAvatar /> : null}
    </div>
  );
}

export default function VoiceBot({
  className,
  endpoint = "/api/voice",
  initialAssistantMessage = "Voice mode is ready. Tap Record, speak, then I’ll respond.",
}: {
  className?: string;
  endpoint?: string;
  initialAssistantMessage?: string;
}) {
  const [turns, setTurns] = useState<VoiceTurn[]>(() => [
    { id: uid(), role: "assistant", transcript: initialAssistantMessage, createdAt: Date.now() },
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [busy, setBusy] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () =>
    requestAnimationFrame(() =>
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    );

  async function startRecording() {
    if (isRecording || busy) return;
    setBusy(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());

        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];

        const userTurnId = uid();
        setTurns((prev) => [
          ...prev,
          { id: userTurnId, role: "user", transcript: "🎙️ (voice message)", createdAt: Date.now() },
        ]);
        scrollToBottom();

        try {
          const form = new FormData();
          form.append("audio", blob, "speech.webm");

          const res = await fetch(endpoint, { method: "POST", body: form });
          if (!res.ok) throw new Error(await res.text());

          const data: {
            userTranscript?: string;
            assistantTranscript?: string;
            assistantAudioUrl?: string;
          } = await res.json();

          if (data.userTranscript) {
            setTurns((prev) =>
              prev.map((t) => (t.id === userTurnId ? { ...t, transcript: data.userTranscript } : t))
            );
          }

          setTurns((prev) => [
            ...prev,
            {
              id: uid(),
              role: "assistant",
              transcript: data.assistantTranscript ?? "Thanks for sharing. What felt hardest today?",
              audioUrl: data.assistantAudioUrl,
              createdAt: Date.now(),
            },
          ]);
          scrollToBottom();
        } catch {
          setTurns((prev) => [
            ...prev,
            { id: uid(), role: "assistant", transcript: "I couldn’t reach the voice service. Try again.", createdAt: Date.now() },
          ]);
        } finally {
          setBusy(false);
        }
      };

      recorder.start();
      setIsRecording(true);
      setBusy(false);
    } catch {
      setBusy(false);
      setTurns((prev) => [
        ...prev,
        { id: uid(), role: "assistant", transcript: "Microphone permission is required for voice mode.", createdAt: Date.now() },
      ]);
    }
  }

  function stopRecording() {
    if (!isRecording) return;
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="space-y-4 pb-3">
          {turns.map((t) => (
            <Bubble key={t.id} side={t.role === "assistant" ? "left" : "right"}>
              <div className="space-y-2">
                {t.transcript ? (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{t.transcript}</div>
                ) : null}

                {t.role === "assistant" && t.audioUrl ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-900">
                      <Volume2 className="h-4 w-4 text-slate-700" />
                      Audio response
                    </div>
                    <audio controls className="w-full">
                      <source src={t.audioUrl} />
                    </audio>
                  </div>
                ) : null}
              </div>
            </Bubble>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)] sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900">Voice controls</div>
            <div className="mt-0.5 text-xs text-slate-500">
              Tap Record to start/stop. Backend calls ElevenLabs and returns audio.
            </div>
          </div>

          <button
            type="button"
            onClick={isRecording ? stopRecording : () => void startRecording()}
            disabled={busy && !isRecording}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-semibold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:opacity-60",
              isRecording ? "bg-rose-600 text-white hover:bg-rose-600/90" : "bg-slate-900 text-white hover:opacity-95"
            )}
          >
            {busy && !isRecording ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
            {isRecording ? "Stop" : "Record"}
          </button>
        </div>
      </div>
    </div>
  );
}
