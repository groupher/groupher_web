// doc: https://tailwindcss.com/docs/screens

module.exports = ({ addComponents, theme }) => {
  const containers = {
    '.container-home': {
      maxWidth: '1460px',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme('spacing.4'),
      paddingRight: theme('spacing.4'),
    },
    '.container-community_sidebar': {
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme('spacing.20'),
      paddingRight: theme('spacing.20'),
    },
    '.container-community': {
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme('spacing.40'),
      paddingRight: theme('spacing.36'),
    },
  }

  addComponents(containers)
}
