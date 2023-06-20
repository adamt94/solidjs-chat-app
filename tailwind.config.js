/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth: {
      "1/4": "25%",
      "1/2": "300px",
      "3/4": "75%",
    },

    extend: {},
  },
  plugins: [],
};