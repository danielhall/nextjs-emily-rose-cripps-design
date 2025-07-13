import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"
import scrollbarHide from "tailwind-scrollbar-hide";
import invertedRadius from "@butterfail/tailwindcss-inverted-radius";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out forwards',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#5DBFC1"
      },
      fontFamily: {
        primary: ["'Josefin Sans'", "sans-serif"],
        secondary: ["'Patrick Hand SC'", "cursive"],
        handsome: ["handsome-pro", "sans-serif"]
      },
      backgroundImage: {
        'postcard': "url('/assets/img/postcard.png')",
      }
    },
  },
  plugins: [
    typography,
    scrollbarHide,
    invertedRadius
  ],
} satisfies Config;