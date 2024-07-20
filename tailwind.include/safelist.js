const TEXT_COLORS = ['article-title', 'article-digest', 'text-title', 'text-digest', 'text-hint']
const BG_COLORS = ['dot']
const FILL_COLORS = ['article-title', 'article-digest']

const UTIL_CLASSES = ['border-divider', 'article-hover-linear']
const RAINBOW_COLORS = ['blue', 'red', 'green', 'purple']

module.exports = [
  ...RAINBOW_COLORS.map(
    (c) => `text-rainbow-${c} text-rainbow-${c}-dark bg-rainbow-${c} bg-rainbow-${c}-dark`,
  ),
  // ...[2, 4].map((n) => `line-clamp-${n}`)
  ...TEXT_COLORS.map((c) => `text-${c} text-${c}-dark`),
  ...BG_COLORS.map((c) => `bg-${c} bg-${c}-dark`),
  ...FILL_COLORS.map((c) => `fill-${c} fill-${c}-dark`),
  ...UTIL_CLASSES.map((c) => `${c} ${c}-dark`),
]
