import type { Config } from "tailwindcss"

const config = {
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
          DEFAULT: "#FFD28E",
        },
        secondary: {
          DEFAULT: "#FFFABC",
        },
        dark: {
          DEFAULT: "#FFFFFF",
        },
        light: {
          DEFAULT: "#333333",
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
  plugins: [require("daisyui"), require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config

export default config