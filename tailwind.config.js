/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
       fill: {'0%':{width: 0}}
      }
    },
  },
  plugins: [],
}

