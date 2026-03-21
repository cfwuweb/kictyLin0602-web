/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
        serif: ['"Noto Serif TC"', 'serif'],
      },
      colors: {
        'brand-green': '#9DC183',
        'brand-green-dark': '#7A9A63',
        'brand-peach': '#F7E7CE',
        'brand-stone': '#FAF9F6',
        'text-main': '#2C3E50',
      }
    }
  },
  plugins: [],
}
