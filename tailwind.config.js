/** @type {import('tailwindcss').Config} */

const { colors, screens, safelist } = require('./tailwind.include')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors,
    screens,
    extend: {
      boxShadow: {
        md: 'rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
        lg: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      },
    },
  },
  safelist,
  plugins: [require('@tailwindcss/typography')],
}
