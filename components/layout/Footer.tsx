// components/layout/Footer.tsx
"use client";

import { useState, FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { FOOTER_COLUMNS } from "@/lib/constants";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Wire to real newsletter endpoint when available
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="pt-20 pb-8 px-6 border-t border-border">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1 font-semibold text-lg mb-4">
              <span className="text-accent">◆</span>
              <span>Nexora</span>
            </div>
            <p className="text-muted text-sm mb-4">Get notified about new products.</p>
            <form onSubmit={handleSubmit} className="flex items-center rounded-pill border border-border pl-4 pr-1 py-1">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="bg-transparent text-sm outline-none flex-1 min-w-0"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-accent text-white shrink-0 focus-visible-ring"
              >
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </form>
          </div>

          {Object.entries(FOOTER_COLUMNS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-text-primary transition-colors duration-200 focus-visible-ring">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-muted text-xs">© 2026 Nexora Technologies. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-muted text-xs hover:text-text-primary transition-colors">Twitter</a>
            <a href="#" className="text-muted text-xs hover:text-text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-muted text-xs hover:text-text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
