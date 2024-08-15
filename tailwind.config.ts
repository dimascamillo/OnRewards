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
        "background-primary": "#171E26",
        "yellow-primary-400": "#F4BC1D",
        "purple-primary-700": "#4a1377",
        "red-primary-400": "#E34242",
        "gray-primary-500": "#24303E",
      },
    },
  },
  plugins: [],
};
export default config;
