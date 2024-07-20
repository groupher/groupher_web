/** @type {import('tailwindcss').Config} */

const { colors, screens, safelist } = require('./tailwind.include')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors,
    screens,
  },
  safelist,
  plugins: [],
}
