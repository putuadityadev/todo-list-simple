/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'rxl' : ' 0 0 5px rgba(255, 0, 0, 0.2);'
      }
    },
  },
  plugins: [],
}

