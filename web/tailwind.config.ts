import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { accent: "#38bdf8" } } },
  plugins: [],
} satisfies Config;
