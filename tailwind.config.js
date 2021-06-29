module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      kanit: ['Kanit', 'sans-serif']
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled']
    }
  },
  plugins: []
}
