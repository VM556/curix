/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Axiforma", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
