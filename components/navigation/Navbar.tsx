// components/navigation/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme(); // "light" | "dark" | "system"
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const ticking = useRef(false);

  // Single rAF-throttled scroll handler drives both the scrolled state
  // and the progress bar — avoids two listeners doing redundant work.
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(scrollTop > 24);
        setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <motion.nav
        aria-label="Primary"
        initial={false}
        animate={{
          backgroundColor: scrolled ? "var(--nav-bg-scrolled)" : "rgba(0,0,0,0)",
          borderBottomColor: scrolled ? "var(--border)" : "transparent",
        }}
        transition={{ duration: 0.3, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      >
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-accent"
          style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }}
        />
        <motion.div
          className="max-w-[1280px] mx-auto flex items-center justify-between px-6"
          animate={{ paddingTop: scrolled ? 14 : 24, paddingBottom: scrolled ? 14 : 24 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {/* Logo — always the fixed left anchor of the header row */}
          <Link href="/" aria-label="Nexora home" className="flex items-center">
            <Image
              src="/logo/nexora-mark.png"
              alt="Nexora"
              width={92}
              height={120}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link text-sm relative py-1 focus-visible-ring ${
                    isActive ? "text-primary" : "text-muted hover:text-primary"
                  }`}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1.5px] bg-accent"
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={
                resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
              }
              className="theme-toggle focus-visible-ring"
            >
              {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary focus-visible-ring"
            >
              Book a Demo
            </a>
          </div>

          {/* Mobile: empty spacer so the logo stays left-aligned; the real
              toggle button below is deliberately rendered OUTSIDE this nav
              element so it can never be trapped inside nav's stacking context. */}
          <div className="md:hidden w-12 h-12" aria-hidden="true" />
        </motion.div>
      </motion.nav>

      {/*
        FIX: this button previously lived inside <nav>, which creates its
        own stacking context at z-50. A z-index set on a child only competes
        within that context — it does NOT out-rank a sibling element outside
        <nav> that has a higher z-index (the overlay, z-[60]). That mismatch
        is why the close icon visually disappeared once the overlay mounted.
        Rendering the button as a top-level fixed element with z-[100],
        completely independent of <nav>'s stacking context, guarantees it is
        always the topmost interactive element, open or closed.
      */}
      <button
        ref={menuButtonRef}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        className="md:hidden fixed top-5 right-5 z-[100] w-12 h-12 rounded-full flex items-center justify-center
                   bg-bg-secondary border border-border shadow-md
                   focus-visible-ring overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {menuOpen ? (
            <motion.span
              key="close-icon"
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="menu-icon"
              initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Menu size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/*
        Overlay: z-[60], deliberately lower than the button's z-[100], and
        now that the button lives outside <nav> entirely, there is no
        stacking-context mismatch left to hide it.
      */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[60] flex flex-col p-6 pt-28 bg-ink/98 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <motion.div className="flex flex-col gap-6" initial="closed" animate="open" exit="closed">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: EASE }}
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-medium focus-visible-ring w-fit block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-auto w-full py-4 text-center focus-visible-ring"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + NAV_LINKS.length * 0.05, ease: EASE }}
            >
              Book a Demo
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
