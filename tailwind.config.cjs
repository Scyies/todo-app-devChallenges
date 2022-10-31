/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    fontFamily: {
      montSerrat: 'Montserrat, sans-serif',
      raleway: 'Raleway, sans-serif',
    },
    colors: {
      black: '#000000',
      white: '#ffffff',
      red: '#EB5757',
      gray: {
        700: '#333333',
        200: '#bdbdbd',
      },
      blue: {
        500: '#2F80ED',
      },
    },
    extend: {},
  },
  plugins: [],
};
