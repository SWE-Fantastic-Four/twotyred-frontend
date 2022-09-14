/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'off-white': '#FFFCFC',
        'gray': '#D9D9D9',
        'light-green': '#BCDD85',
        'dark-green': '#70C174'
      },
      fontFamily: {
        'primary': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
