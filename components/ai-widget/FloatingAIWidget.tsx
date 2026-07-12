// components/ai-widget/FloatingAIWidget.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, X, Mic, Send, Volume2, VolumeX, RotateCcw, Square,
} from "lucide-react";
import { CALENDAR_URL } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INTRO_TEXT =
  "Hi 👋 We're the team at Nexora. We help businesses automate sales, customer support, and operations using AI. Ask us anything.";

const QUICK_REPLIES = ["AI Automation", "Website Development", "Book a free call"];

// Fallback only — used if ElevenLabs isn't configured or fails.
function speakBrowserFallback(text: string, onEnd: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) return onEnd();
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.02;
  utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

export function FloatingAIWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [introTyped, setIntroTyped] = useState("");
  const [introDone, setIntroDone] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [lastAiText, setLastAiText] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const introTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Tracks whether the message currently being answered was sent via mic —
  // if so, the reply always plays as voice regardless of the manual toggle.
  const lastInputWasVoiceRef = useRef(false);

  // Streams audio straight from /api/tts (ElevenLabs) — playback starts as
  // soon as the browser has enough of the first chunk buffered, not after
  // the whole clip is generated. Falls back to browser TTS on any failure.
  // iOS Safari only allows audio.play() to work reliably when it's first
  // called synchronously inside a real tap — after that, the SAME element
  // can keep playing even from later async code (like our AI reply arriving
  // after a network round-trip). So we "unlock" one persistent element the
  // moment the visitor taps mic or send, before any async work starts.
  const unlockAudio = useCallback(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    const silence =
      "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
    audioRef.current.src = silence;
    audioRef.current.play().then(() => audioRef.current?.pause()).catch(() => {});
  }, []);

  const playVoice = useCallback((text: string, onEnd: () => void) => {
    try {
      if (!audioRef.current) audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.pause();
      audio.src = `/api/tts?text=${encodeURIComponent(text)}`;
      audio.onended = onEnd;
      audio.onerror = () => speakBrowserFallback(text, onEnd);
      audio.play().catch(() => speakBrowserFallback(text, onEnd));
    } catch {
      speakBrowserFallback(text, onEnd);
    }
  }, []);

  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { message?: string } | undefined;
      setOpen(true);
      if (detail?.message) setPendingMessage(detail.message);
    };
    window.addEventListener("open-nexora-ai", handler);
    return () => window.removeEventListener("open-nexora-ai", handler);
  }, []);

  // Auto-type the intro once the widget is first opened, unless the
  // visitor has already interacted (typed/mic/send) — per spec, intro
  // stops permanently the instant a real interaction happens.
  useEffect(() => {
    if (!open || userInteracted || messages.length > 0) return;
    let i = 0;
    const type = () => {
      if (userInteracted) return;
      if (i <= INTRO_TEXT.length) {
        setIntroTyped(INTRO_TEXT.slice(0, i));
        i++;
        introTimeoutRef.current = setTimeout(type, 20);
      } else {
        setIntroDone(true);
      }
    };
    type();
    return () => clearTimeout(introTimeoutRef.current);
  }, [open, userInteracted, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const stopIntroForever = useCallback(() => {
    if (userInteracted) return;
    setUserInteracted(true);
    clearTimeout(introTimeoutRef.current);
    if (introTyped !== INTRO_TEXT) {
      setMessages([{ role: "assistant", content: INTRO_TEXT }]);
    }
  }, [userInteracted, introTyped]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      stopIntroForever();
      const nextMessages: Message[] = [...messages, { role: "user", content: text }];
      setMessages(nextMessages);
      setInput("");
      setThinking(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });
        const data = await res.json();
        const reply: string = data.reply ?? "Sorry, something went wrong on my end — try again in a moment.";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
        setLastAiText(reply);
        const shouldSpeak = voiceOn || lastInputWasVoiceRef.current;
        if (shouldSpeak) {
          setSpeaking(true);
          playVoice(reply, () => setSpeaking(false));
        }
        lastInputWasVoiceRef.current = false;
      } catch {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Connection issue — please try again." },
        ]);
      } finally {
        setThinking(false);
      }
    },
    [messages, stopIntroForever, voiceOn, playVoice]
  );

  // Fires a chip's topic as the first real message once the widget is open —
  // this is what makes tapping "WhatsApp automation" on the Hero card
  // actually ask that question, not just open an empty chat.
  useEffect(() => {
    if (open && pendingMessage) {
      sendMessage(pendingMessage);
      setPendingMessage(null);
    }
  }, [open, pendingMessage, sendMessage]);

  const toggleMic = () => {
    stopIntroForever();
    unlockAudio(); // must run synchronously, inside this tap — before anything async
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (SpeechRecognition) {
      // Chrome / Edge path — native, instant, free.
      if (listening) {
        recognitionRef.current?.stop();
        setListening(false);
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        lastInputWasVoiceRef.current = true;
        sendMessage(transcript);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      recognition.start();
      setListening(true);
      return;
    }

    // Safari / iOS path — no native SpeechRecognition support at all here,
    // so we record audio directly and transcribe it via Groq Whisper.
    toggleRecordingFallback();
  };

  const toggleRecordingFallback = async () => {
    if (listening) {
      mediaRecorderRef.current?.stop();
      setListening(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType =
        ["audio/mp4", "audio/webm", "audio/ogg"].find((t) => MediaRecorder.isTypeSupported(t)) || "";
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: mimeType || "audio/webm" });
        setThinking(true);
        try {
          const form = new FormData();
          form.append("audio", blob, "voice.webm");
          const res = await fetch("/api/stt", { method: "POST", body: form });
          const data = await res.json();
          if (data.text?.trim()) {
            lastInputWasVoiceRef.current = true;
            sendMessage(data.text.trim());
          } else {
            setThinking(false);
          }
        } catch {
          setThinking(false);
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setListening(true);
    } catch {
      alert("We need microphone access to hear you — check your browser permissions.");
    }
  };

  return (
    <>
      {/* Floating trigger bubble */}
      <motion.button
        onClick={() => {
          unlockAudio();
          setOpen((v) => !v);
        }}
        aria-label={open ? "Close Nexora AI" : "Open Nexora AI"}
        className="fixed bottom-6 right-6 z-[90] w-16 h-16 rounded-full flex items-center justify-center
                   bg-accent text-white shadow-lg focus-visible-ring"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: open ? "0 0 0 0 rgba(232,84,42,0)" : "0 0 0 8px rgba(232,84,42,0.12)" }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.2 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="spark" initial={{ opacity: 0, rotate: 45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -45 }} transition={{ duration: 0.2 }}>
              <Sparkles size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Nexora AI Assistant"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-24 right-6 z-[90] w-[calc(100vw-3rem)] max-w-[400px] h-[70vh] max-h-[600px]
                       rounded-lg border border-border bg-bg-secondary/95 backdrop-blur-xl shadow-lg
                       flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-bg-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Nexora AI</div>
                  <div className="text-xs text-muted">AI Automation Assistant</div>
                </div>
              </div>
              <button
                onClick={() => setVoiceOn((v) => !v)}
                aria-pressed={voiceOn}
                aria-label={voiceOn ? "Turn voice replies off" : "Turn voice replies on"}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors focus-visible-ring"
              >
                {voiceOn ? <Volume2 size={15} className="text-accent" /> : <VolumeX size={15} className="text-muted" />}
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.length === 0 && (
                <div className="rounded-md rounded-tl-none bg-ink border border-border p-3 text-sm max-w-[90%]">
                  {introTyped}
                  {!introDone && (
                    <span className="inline-block w-[2px] h-[14px] bg-current ml-0.5 align-middle animate-pulse" />
                  )}
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-md p-3 text-sm max-w-[90%] leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "rounded-tr-none bg-accent text-white ml-auto"
                      : "rounded-tl-none bg-ink border border-border"
                  }`}
                >
                  {m.content}
                </div>
              ))}

              {thinking && (
                <div className="rounded-md rounded-tl-none bg-ink border border-border p-3 max-w-[60%] flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}

              {speaking && (
                <div className="flex items-center gap-2 text-xs text-muted px-1">
                  <Volume2 size={12} className="text-accent" /> Speaking…
                  <button
                    onClick={() => {
                      audioRef.current?.pause();
                      window.speechSynthesis?.cancel();
                      setSpeaking(false);
                    }}
                    className="underline hover:text-text-primary"
                  >
                    <Square size={10} className="inline mr-0.5" /> Stop
                  </button>
                  <button
                    onClick={() => {
                      setSpeaking(true);
                      playVoice(lastAiText, () => setSpeaking(false));
                    }}
                    className="underline hover:text-text-primary"
                  >
                    <RotateCcw size={10} className="inline mr-0.5" /> Replay
                  </button>
                </div>
              )}

              {/* Quick replies — only before the visitor has interacted */}
              {!userInteracted && introDone && messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-pill border border-border text-muted hover:text-text-primary hover:border-accent transition-colors focus-visible-ring"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Calendar handoff once the AI has clearly moved into booking mode */}
              {lastAiText.toLowerCase().includes("calendar") && (
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block text-center text-sm focus-visible-ring"
                >
                  Pick a time on our calendar
                </a>
              )}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
              <button
                onClick={toggleMic}
                aria-pressed={listening}
                aria-label="Voice input"
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors focus-visible-ring"
                style={{
                  backgroundColor: listening ? "#E8542A" : "transparent",
                  border: listening ? "none" : "1px solid var(--border-color)",
                  color: listening ? "white" : undefined,
                }}
              >
                <Mic size={16} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={stopIntroForever}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    unlockAudio();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask Nexora AI anything…"
                className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <button
                onClick={() => {
                  unlockAudio();
                  sendMessage(input);
                }}
                aria-label="Send message"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity focus-visible-ring"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
