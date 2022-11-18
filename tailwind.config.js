/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing :{
        '128':'40.5rem',
        '120':'18.1em',
        '125':'33.5em'
      }
    },
  }, 
  variants:{
  backgroundColor:['responsive','hover','focus','active']
  },
  plugins: [],
}
