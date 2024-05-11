/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        freeman: 'Freeman',
        nunito: 'Nunito',
      },
      colors: {
        primary: '#7b46a5',
        secondary: {
          400: '#a9c890',
          500: '#71a446',
          600: '#5a8338',
        },
        background: '#ece9ee',
        text: '#777f82',
      },
      minWidth: {
        '1/2': '50%',
      },
    },
  },
  plugins: [],
};
