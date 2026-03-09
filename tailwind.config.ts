import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#12100e",
        foreground: "#f6eee0",
        card: "#1a1512",
        border: "#3b2c26",
        muted: "#2c211d",
        accent: "#836953",
        success: "#3d6b4f",
        warning: "#a46a2d",
        danger: "#7d2b2b"
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.25)"
      }
    }
  },
  plugins: []
};

export default config;
