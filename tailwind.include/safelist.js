const TEXT_COLORS = ['article-title', 'article-digest']
const FILL_COLORS = ['article-title', 'article-digest']

const UTIL_CLASSES = ['bg-hoverLinear', 'border-divider']

module.exports = [
  ...['blue', 'red', 'green', 'purple'].map((c) => `text-rainbow-${c}`),
  // ...[2, 4].map((n) => `line-clamp-${n}`)
  // text colors
  ...TEXT_COLORS.map((c) => `text-${c} text-${c}-dark`),
  ...FILL_COLORS.map((c) => `fill-${c} fill-${c}-dark`),
  ...UTIL_CLASSES.map((c) => `${c} ${c}-dark`),
]
