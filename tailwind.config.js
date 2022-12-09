/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "true-gray": {
          '50':  '#f9fafb',
          '100': '#f0f1f3',
          '200': '#d9dbdf',
          '300': '#b7bbc2',
          '400': '#8f959f',
          '500': '#6e7582',
          '600': '#555e6e',
          '700': '#3e4859',
          '800': '#262626',
          '900': '#171717',
        },
      }
    },
  },
  darkMode: 'class'
}
