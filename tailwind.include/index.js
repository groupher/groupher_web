const dayTheme = require('./theme/day')
const safelist = require('./safelist')

module.exports = {
  dayTheme: () => dayTheme,
  safelist: () => safelist,
}
