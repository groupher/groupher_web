const colors = require('./theme/colors')
const safelist = require('./safelist')

module.exports = {
  theme: () => colors,
  safelist: () => safelist,
}
