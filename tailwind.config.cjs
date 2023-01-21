/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      container: {
        padding: '1.5rem',
        center: true,
        screens: {
          xl: '1024px',
        },
      },
      colors: {
        background: '#09090a',
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
