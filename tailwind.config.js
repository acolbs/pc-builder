/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // THESE LINES ARE CRUCIAL!
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}