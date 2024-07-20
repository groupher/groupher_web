const TEXT_COLORS = ['article-title', 'article-digest', 'text-title', 'text-digest', 'text-hint']
const FILL_COLORS = ['article-title', 'article-digest']

const UTIL_CLASSES = ['bg-hoverLinear', 'border-divider']

const RAINBOW_COLORS = ['blue', 'red', 'green', 'purple']

module.exports = [
  ...RAINBOW_COLORS.map(
    (c) => `text-rainbow-${c} text-rainbow-${c}-dark bg-rainbow-${c} bg-rainbow-${c}-dark`,
  ),
  // ...[2, 4].map((n) => `line-clamp-${n}`)
  // text colors
  ...TEXT_COLORS.map((c) => `text-${c} text-${c}-dark`),
  ...FILL_COLORS.map((c) => `fill-${c} fill-${c}-dark`),
  ...UTIL_CLASSES.map((c) => `${c} ${c}-dark`),
]
