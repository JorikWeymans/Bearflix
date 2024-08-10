/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#F4E1CB',
        'secondary-color': '#EECD65',
        'tertiary-color': '#364529',
      },
    },
  },
  plugins: [],
}

