import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        'header': "linear-gradient(to bottom, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 1) 100%), url('./assets/img/header_background.jpg')",
        'bookmark': "url('./assets/img/bookmark_background.png')",
      },          
    },
  },
  plugins: [
    typography,
    scrollbarHide
  ],
} satisfies Config;