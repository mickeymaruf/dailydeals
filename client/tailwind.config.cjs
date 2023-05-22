/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        dailydeals: {

          "primary": "#059669",

          "secondary": "#10b981",

          "accent": "#6b7280",

          "neutral": "#374151",

          "base-100": "#f3f4f6",

          "info": "#0284c7",

          "success": "#16a34a",

          "warning": "#FBBD23",

          "error": "#f87171",

        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
