import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "ef-aone": ["EF_AONE"],
        notoSans: ["NotoSans"],
        notoSansKR: ["NotoSansKR"],
      },
      fontSize: {
        "1.5xl": "22px",
      },
      colors: {
        fontcolor: "#3744FB",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
