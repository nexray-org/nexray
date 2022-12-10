// https://vercel.com/design/color
// https://github.com/geist-org/geist-ui/blob/master/components/themes/presets/dark.ts

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "g-primary": {
          '50':  '#FFF',
          '100': '#FAFAFA',
          '200': '#EAEAEA',
          '300': '#999',
          '400': '#888',
          '500': '#666',
          '600': '#444',
          '700': '#333',
          '800': '#111',
          '900': '#000'
        },
        "g-error": {
          '50': '#F7D4D6',
          '100': '#F33',
          '200': '##FF0000',
          '300': '#E60000'
        },
        "g-success": {
          '50': '#D3E5FF',
          '100': '#3291FF',
          '200': '#0070F3',
          '300': '#0761D1'
        },
        "g-warning": {
          '50': '#FFEFCF',
          '100': '#F7B955',
          '200': '#F5A623',
          '300': '#AB570A'
        },
        "g-violet": {
          '50': '#D8CCF1',
          '100': '#8A63D2',
          '200': '#7928CA',
          '300': '#4C2889'
        },
        "g-cyan": {
          '50': '#AAFFEC',
          '100': '#79FFE1',
          '200': '#50E3C2',
          '300': '#29BC9B'
        },
        "g-highlight": {
          '50': '#F81CE5',
          '100': '#EB367F',
          '200': '#FF0080',
          '300': '#FFF500'
        }
      }
    },
  },
  darkMode: 'class'
}
