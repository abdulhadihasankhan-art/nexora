// hooks/useTheme.tsx
"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";

// Theme switching has been intentionally disabled per product decision —
// Nexora is permanently dark with white text. This provider now only
// applies the fixed dark attribute once on mount so existing CSS variables
// (data-theme="dark" in globals.css) keep working without touching every
// component that reads them.

interface ThemeContextValue {
  resolvedTheme: "dark";
}

const ThemeContext = createContext<ThemeContextValue>({ resolvedTheme: "dark" });

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ resolvedTheme: "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
