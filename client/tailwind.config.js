/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'editor-primary': '#344E41',
      'editor-secondary': '#588157',
      'editor-tertiary': '#A3B18A',
      'editor-background': '#DAD7CD',
      'editor-highlight': '#428BC1',
      'white': '#FFFFFF',
      'light-green': "#87C56C",
      "dark-green": "#004500",
      "red": "#D51300",
      "white": "#FFFFFF",
      "black": "#000000",
      "purple": "#640064",
      "dark-gray": "#dadada",
      "darker-gray": "#5A5A5A",
      "darker-green": "#006400",
      "dark-green-lighter": "#006400",
      "light-grey": "#D6D6D6"
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: (theme) => ({
        'gradient-primary': 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(290.23deg, #54C941 0%, #ABDE81 100%, #C9E8B1 100%)',
      }),
      gridTemplateRows: {
        'profile': 'auto auto auto'
      }
    },
  },
  plugins: [],
}
