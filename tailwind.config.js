/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("postcss"),
    require("tailwindcss"),
    // require("autoprefixer"),
  ],
}
