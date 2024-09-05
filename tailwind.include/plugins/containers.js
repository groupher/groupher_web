// doc: https://tailwindcss.com/docs/screens

const { container: C } = require('../../utils/constant/twConfig.json')

module.exports = ({ addComponents, theme }) => {
  // TODO: refactor, based on const/twConfig
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
    '.container-dashboard': {
      maxWidth: C.dashboard.width,
      paddingLeft: theme(`spacing.${C.dashboard.pl}`),
      paddingRight: theme(`spacing.${C.dashboard.pr}`),
      '@apply mx-auto': {},
    },
  }

  addComponents(containers)
}
