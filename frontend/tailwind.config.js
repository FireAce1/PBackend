/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#0F172A",
        accent: "#14B8A6",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#DC2626",
        slate: {
          950: "#0F172A"
        }
      }
    },
  },
  plugins: [],
}
