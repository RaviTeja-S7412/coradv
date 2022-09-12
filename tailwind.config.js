/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  './node_modules/tw-elements/dist/js/**/*.js'
],
  theme: {
    extend: {
      backgroundImage: theme =>({
        'image' : "url('/logobg')"
      }
      ),
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
