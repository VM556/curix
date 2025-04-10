module.exports = {
  darkMode: "class", // important!
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: false, // disable DaisyUI's themes
  },
};
