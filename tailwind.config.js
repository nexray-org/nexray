const customColors = {
  "primary-color": "#171717",
  "primary-light-color": "#1c1c1e",
  "primary-dark-color": "#262626",
  "primary-contrast-color": "#161616",
  "secondary-color": "#a3a3a3",
  "secondary-light-color": "#737373",
  "secondary-dark-color": "#f5f5f5",
  "divider-color": "#262626",
  "divider-light-color": "#1f1f1f",
  "divider-dark-color": "#2d2d2d",
  "error-color": "#292524",
  "tooltip-color": "#f5f5f5",
  "popover-color": "#1b1b1b",
  "editor-type-color": "#a78bfa",
  "editor-name-color": "#60a5fa",
  "editor-operator-color": "#818cf8",
  "editor-invalid-color": "#f87171",
  "editor-separator-color": "#9ca3af",
  "editor-meta-color": "#9ca3af",
  "editor-variable-color": "#34d399",
  "editor-link-color": "#22d3ee",
  "editor-process-color": "#e879f9",
  "editor-constant-color": "#a78bfa",
  "editor-keyword-color": "#f472b6"
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: customColors
    },
  },
  darkMode: 'class'
}
