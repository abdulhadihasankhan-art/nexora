import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0D12",
        "bg-secondary": "#14171E",
        panel: "#F7F6F3",
        accent: {
          DEFAULT: "#E8542A",
          hover: "#FF6B3D",
          light: "#D6491F",
        },
        border: {
          DEFAULT: "#232833",
          light: "#E4E1DA",
        },
        muted: {
          DEFAULT: "#9AA3B2",
          light: "#4B5563",
        },
      },
      fontFamily: {
        display: ["General Sans", "Söhne", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: ["14px", "1.5"],
        sm: ["16px", "1.6"],
        base: ["18px", "1.6"],
        lg: ["24px", "1.4"],
        xl: ["32px", "1.3"],
        "2xl": ["40px", "1.2"],
        "3xl": ["56px", "1.15"],
      },
      spacing: {
        18: "4.5rem",
        24: "6rem",
        32: "8rem",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.15)",
        md: "0 4px 12px rgba(0,0,0,0.20)",
        lg: "0 12px 32px rgba(0,0,0,0.28)",
        "accent-glow": "0 0 24px rgba(232,84,42,0.25)",
      },
      transitionTimingFunction: {
        "brand-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
