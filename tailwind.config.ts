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
        primary: "#5fc0c5"
      },
      fontFamily: {
        primary: ["Goudy Bookletter 1911", "serif"],
        secondary: ["Vidaloka", "serif"]
      },
      backgroundImage: {
        'main': "url('/assets/img/background-texture.jpg')",
        'triangle': "url('/assets/img/triangle.png')",
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