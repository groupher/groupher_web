/** @type {import('tailwindcss').Config} */

const { colors, screens, safelist, plugins } = require('./tailwind.include')

module.exports = {
  content: [
    // remove this after migrate from styled-components to tailwind
    // but remove it will cause @tailwindcss/typography issue
    './src/**/*.{js,ts,jsx,tsx}',
    // './src/**/salon/**/*.ts',
  ],
  theme: {
    colors,
    screens,
    extend: {
      boxShadow: {
        sm: 'rgba(100, 100, 111, 0.1) 1px 2px 29px 0px',
        md: 'rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
        lg: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        'lg-dark': '-9px 7px 20px 9px rgb(24 24 24 / 15%)',
        xl: '-3px 2px 20px 0px rgb(58 58 58 / 15%)',
        'xl-dark': '-9px 7px 20px 9px rgb(24 24 24 / 44%)',
      },
      // borderColor: (theme) => ({
      // 'custom-light/35': `${theme('colors.rainbow.purple.light')}59`, // 35% 透明度
      // 'rainbow-purple-dark/75': 'rgba(var(--rainbow-custom-dark), 0.75)',
      // }),
    },
  },
  safelist,
  plugins: [require('@tailwindcss/typography'), plugins.containers],
}
