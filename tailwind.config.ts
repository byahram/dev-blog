import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ 필수!
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        muted_foreground: "var(--muted-foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
