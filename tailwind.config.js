/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s infinite linear',
      },
    },
  },
  plugins: [],
};
