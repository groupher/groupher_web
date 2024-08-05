// doc: https://tailwindcss.com/docs/screens

const { container: C } = require('../../utils/constant/container.json')

module.exports = ({ addComponents, theme }) => {
  const containers = {
    '.container-home': {
      maxWidth: C.home.width,
      paddingLeft: theme(`spacing.${C.home.pl}`),
      paddingRight: theme(`spacing.${C.home.pr}`),
      '@apply mx-auto': {},
      // '@screen md': {
      //   paddingLeft: theme('spacing.6'),
      //   paddingRight: theme('spacing.6'),
      // },
    },
    '.container-community_sidebar': {
      maxWidth: C.community.width,
      paddingLeft: theme(`spacing.${C.community_sidebar.pl}`),
      paddingRight: theme(`spacing.${C.community_sidebar.pr}`),
      '@apply mx-auto': {},
    },
    '.container-community': {
      maxWidth: C.community.width,
      paddingLeft: theme(`spacing.${C.community.pl}`),
      paddingRight: theme(`spacing.${C.community.pr}`),
      '@apply mx-auto': {},
    },
  }

  addComponents(containers)
}
