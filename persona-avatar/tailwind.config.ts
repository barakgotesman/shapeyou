import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Heebo", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          primary:   "#6C63FF",
          secondary: "#A78BFA",
          highlight: "#FCD34D",
          dark:      "#1F1B4E",
          surface:   "#F5F3FF",
          muted:     "#EDE9FE",
        },
        // shadcn CSS-variable tokens
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border:  "hsl(var(--border))",
        input:   "hsl(var(--input))",
        ring:    "hsl(var(--ring))",
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // Safelist ensures brand classes are always generated even if only used inside CVA/dynamic strings
  safelist: [
    "bg-brand-primary", "bg-brand-secondary", "bg-brand-highlight", "bg-brand-dark", "bg-brand-surface", "bg-brand-muted",
    "text-brand-primary", "text-brand-secondary", "text-brand-highlight", "text-brand-dark",
    "border-brand-primary", "border-brand-secondary", "border-brand-muted",
    "from-brand-primary", "from-brand-dark", "from-brand-secondary", "from-brand-surface",
    "via-brand-primary", "via-brand-highlight", "via-brand-secondary",
    "to-brand-primary", "to-brand-secondary", "to-brand-muted",
    "hover:bg-brand-primary", "hover:bg-brand-muted", "hover:text-brand-primary",
  ],
  plugins: [tailwindAnimate],
} satisfies Config;
