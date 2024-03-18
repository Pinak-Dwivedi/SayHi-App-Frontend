/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dominant: "#8B00FF",
        compliment: "#F8FAFC",
        accent: "#1F1926",
      },
      fontFamily: {
        roboto: "Roboto",
        poppins: "Poppins",
      },
    },
  },
  plugins: [],
};
