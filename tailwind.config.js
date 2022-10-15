/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      mont: ['Montserrat Alternates', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      barlow: ['Barlow', 'sans-serif']
    }
  },
  plugins: [],
}
