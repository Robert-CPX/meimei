import type { Config } from "tailwindcss"

const config = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(36, 100%, 78%)",
          light: "hsl(56, 100%, 87%)",
        },
        background: {
          DEFAULT: "hsl(50, 13%, 95%)",
        },
        light: {
          DEFAULT: "hsl(0, 0%, 100%)",
        },
        dark: {
          DEFAULT: "hsl(0, 0%, 20%)",
        },
        error: {
          DEFAULT: "hsl(357, 100%, 74%)",
        },
      },
      fontFamily: {
        lexendDeca: ["var(--font-lexend_deca)"],
        lemon: ["var(--font-lemon)"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config

export default config