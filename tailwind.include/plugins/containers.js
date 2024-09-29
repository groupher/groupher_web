const { keys } = require('ramda')
// doc: https://tailwindcss.com/docs/screens

const { container: containerConf } = require('../../utils/constant/twConfig.json')

module.exports = ({ addComponents, theme }) => {
  // example:
  // '.container-home': {
  //   maxWidth: C.home.width,
  //   paddingLeft: theme(`spacing.${C.home.pl}`),
  //   paddingRight: theme(`spacing.${C.home.pr}`),
  //   '@apply mx-auto': {},
  //   // '@screen md': {
  //   //   paddingLeft: theme('spacing.6'),
  //   //   paddingRight: theme('spacing.6'),
  //   // },
  // },

  const containers = keys(containerConf).map((c) => ({
    [`.container-${c}`]: {
      maxWidth: containerConf[c].width,
      paddingLeft: theme(`spacing.${containerConf[c].pl}`),
      paddingRight: theme(`spacing.${containerConf[c].pr}`),
      '@apply mx-auto': {},
    },
  }))

  addComponents(containers)
}
