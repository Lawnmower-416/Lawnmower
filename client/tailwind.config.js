/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'editor-primary': '#344E41',
      'light-green': "#87C56C",
      "dark-green": "#004500",
      "red": "#D51300",
      "white": "#FFFFFF",
      "black": "#000000",
      "purple": "#640064",
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}