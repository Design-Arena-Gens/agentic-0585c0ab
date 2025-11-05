import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0f172a",
        accent: "#6366f1",
        accentMuted: "#c7d2fe"
      },
      boxShadow: {
        subtle: "0 20px 45px -24px rgba(99, 102, 241, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
