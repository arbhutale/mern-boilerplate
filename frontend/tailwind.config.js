// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e95420",     // United orange
        secondary: "#292b2c",   // United dark text
        light: "#f7f7f7",       // Backgrounds
        dark: "#222",           // Dark mode base
      },
      fontFamily: {
        sans: ["Helvetica Neue", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
