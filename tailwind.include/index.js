const lightTheme = require('./theme/light')
const safelist = require('./safelist')

module.exports = {
  theme: () => lightTheme,
  safelist: () => safelist,
}
