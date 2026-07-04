// components/hero/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Mic, Flame, TrendingUp, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

// Demo widget is heavy and only needed on click — load it lazily.
const LiveDemoPanel = dynamic(() => import("./LiveDemoPanel"), {
  ssr: false,
  loading: () => <div className="h-24 animate-pulse rounded-lg bg-bg-secondary" />,
});

const RESPONSE_TEXT =
  "Bien sûr ! Pour combien de personnes souhaitez-vous réserver la table ?";

const SUGGESTION_CHIPS = ["Ask about pricing", "Practice pronunciation", "Change topic"];

export function Hero() {
  const [typed, setTyped] = useState("");
  const [listening, setListening] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const type = () => {
      if (i <= RESPONSE_TEXT.length) {
        setTyped(RESPONSE_TEXT.slice(0, i));
        i++;
        timeout = setTimeout(type, 28);
      } else {
        timeout = setTimeout(() => {
          i = 0;
          setTyped("");
          type();
        }, 3000);
      }
    };
    const startDelay = setTimeout(type, 900);
    return () => {
      clearTimeout(timeout);
      clearTimeout(startDelay);
    };
  }, []);

  return (
    <section className="relative max-w-[1280px] mx-auto px-6 pt-40 pb-32 md:pt-48 md:pb-40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 600px at 75% 15%, rgba(232,84,42,0.10), transparent 60%), radial-gradient(ellipse 700px 500px at 10% 80%, rgba(232,84,42,0.05), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col md:flex-row items-center gap-16">
        <motion.div
          className="w-full md:w-[52%]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase mb-6 px-3 py-1 rounded-pill border border-accent text-accent">
            <Sparkles size={12} aria-hidden="true" />
            AI Products, Shipped
          </div>
          <h1 className="text-4xl md:text-3xl font-display font-semibold leading-[1.1] tracking-tight mb-6 text-text-primary">
            We build AI that people actually use.
          </h1>
          <p className="text-lg md:text-base text-muted mb-10 max-w-xl leading-relaxed">
            Nexora designs and ships AI-powered products across language
            learning, healthcare, and business automation — not concepts,
            live software.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="btn-primary flex items-center gap-2 focus-visible-ring">
              Explore Products <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              onClick={() => setDemoOpen((v) => !v)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-pill font-medium border border-border hover:border-accent transition-colors duration-150 focus-visible-ring"
              aria-expanded={demoOpen}
            >
              <Play size={16} aria-hidden="true" /> Try it live
            </button>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-[48%] relative"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hidden md:flex absolute -top-6 -right-6 z-10 bg-bg-secondary border border-border rounded-md px-4 py-3 items-center gap-2 shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <TrendingUp size={16} className="text-accent" aria-hidden="true" />
            <div>
              <div className="text-sm font-semibold leading-none">87%</div>
              <div className="text-[10px] text-muted leading-none mt-1">Fluency score</div>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:flex absolute -bottom-6 -left-6 z-10 bg-bg-secondary border border-border rounded-md px-4 py-3 items-center gap-2 shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            <Flame size={16} className="text-accent" aria-hidden="true" />
            <div>
              <div className="text-sm font-semibold leading-none">12 days</div>
              <div className="text-[10px] text-muted leading-none mt-1">Practice streak</div>
            </div>
          </motion.div>

          <div className="rounded-lg border border-border bg-bg-secondary p-5 shadow-lg relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent text-white text-sm font-semibold">
                  F
                </div>
                <div>
                  <div className="text-sm font-medium">Fluide AI</div>
                  <div className="text-xs text-muted">Conversation practice</div>
                </div>
              </div>
              <div className="text-xs text-muted">TCF Mode</div>
            </div>

            <div className="rounded-md border border-border p-4 space-y-3 min-h-[180px]" aria-live="polite">
              <div className="rounded-md rounded-tr-none p-3 text-sm max-w-[85%] ml-auto bg-accent text-white">
                Je voudrais réserver une table pour ce soir.
              </div>
              <div className="border border-border rounded-md rounded-tl-none p-3 text-sm max-w-[85%] min-h-[44px]">
                {typed}
                <span className="inline-block w-[2px] h-[14px] bg-current ml-0.5 align-middle animate-pulse" aria-hidden="true" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip}
                  className="text-xs px-3 py-1.5 rounded-pill border border-border text-muted hover:text-text-primary hover:border-accent transition-colors duration-150 focus-visible-ring"
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <button
                onClick={() => setListening((v) => !v)}
                aria-pressed={listening}
                aria-label="Toggle voice input"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-accent text-white shrink-0 transition-transform duration-150 focus-visible-ring"
                style={{
                  transform: listening ? "scale(1.05)" : "scale(1)",
                  boxShadow: listening ? "0 0 0 6px rgba(232,84,42,0.15)" : "none",
                }}
              >
                <Mic size={18} aria-hidden="true" />
              </button>
              <div className="flex items-center gap-[3px] h-8 flex-1" aria-hidden="true">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-border"
                    animate={
                      listening
                        ? { scaleY: [0.6, 1, 0.6], backgroundColor: "#E8542A" }
                        : { scaleY: 0.3, backgroundColor: "#232833" }
                    }
                    transition={{ duration: 0.8, repeat: listening ? Infinity : 0, delay: i * 0.04 }}
                    style={{ height: "20px" }}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted mt-3 text-center">
            Live product preview — Fluide AI conversation engine
          </p>
        </motion.div>
      </div>

      {demoOpen && <LiveDemoPanel />}
    </section>
  );
}
