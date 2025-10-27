/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts,css}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("postcss"),
    require("@tailwindcss/postcss"),
    // require("autoprefixer"),
  ],
}
