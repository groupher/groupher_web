/** @type {import('tailwindcss').Config} */

const include = require('./tailwind.include')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      ...include.dayTheme(),
    },
  },
  safelist: include.safelist(),
  plugins: [],
}
