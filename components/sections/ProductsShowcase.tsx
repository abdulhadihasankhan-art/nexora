// components/sections/ProductsShowcase.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";

export function ProductsShowcase() {
  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-xl mb-16">
          <div className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-3 py-1 rounded-pill border border-border text-muted">
            Products
          </div>
          <h2 className="text-[26px] md:text-2xl font-display font-semibold tracking-tight mb-4">
            Real AI products we&apos;ve shipped.
          </h2>
          <p className="text-muted text-lg">
            Live software serving real users — proof we build AI that works, not demos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              tabIndex={0}
              role="button"
              aria-label={`${p.name} — ${p.desc}`}
              className="group relative rounded-lg border border-border bg-bg-secondary p-6 cursor-pointer focus-visible-ring"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent text-white font-semibold shrink-0">
                    {p.initial}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg leading-tight">{p.name}</h3>
                    <span className={`text-xs ${p.inDevelopment ? "text-muted" : "text-text-primary"}`}>
                      {p.tag}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
              <p className="text-muted text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="text-xs border-t border-border pt-3 text-muted">{p.stat}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
