/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        //Primary
        'grayishBlue': 'hsl(237, 18%, 59%)',
        'softRed': 'hsl(345, 95%, 68%)',
        //Neutral
        'white': 'hsl(0, 0%, 100%)',
        'darkDesaturatedBlue': 'hsl(236, 21%, 26%)',
        'veryDarkBlue': 'hsl(235, 16%, 14%)',
        'veryDarkBlacBlue': 'hsl(234, 17%, 12%)',
      }
    },
  },
  plugins: [],
}

