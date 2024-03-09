import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-600": "#24303E",
        "brand-700": "#171E26",

        "yellow-brand-200": "#F4BC1D",
        "yellow-brand-400": "#F4BC1D",
        "yellow-brand-500": "#C69406",
      },
    },
  },
  plugins: [],
};

export default config;
