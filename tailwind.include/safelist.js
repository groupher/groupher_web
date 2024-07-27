const TEXT_COLORS = [
  'article-title',
  'article-digest',
  'text-title',
  'text-digest',
  'text-body',
  'text-hint',
]

const BG_COLORS = ['dot', 'hoverBg', 'htmlBg', 'popover-bg', 'menuHoverBg']
const FILL_COLORS = ['text-title', 'text-digest', 'text-body', 'rainbow-red']

const GENERAL_CLASSES = ['border-divider', 'article-hover-linear']
const RAINBOW_COLORS = ['blue', 'red', 'yellow', 'green', 'greenLight', 'purple']

const MARGIN = ['px', 0.5, 1, 1.5, 2, 2.5, 3]
const UTILS = [
  'size-1.5',
  'size-2',
  'size-2.5',
  'size-3',
  'size-3.5',
  'size-4',
  'size-5',
  'size-6',
  'border-transparent',
]

module.exports = [
  ...RAINBOW_COLORS.map(
    (c) =>
      `text-rainbow-${c} text-rainbow-${c}-dark bg-rainbow-${c} bg-rainbow-${c}-dark bg-rainbow-${c}Bg bg-rainbow-${c}Bg-dark fill-rainbow-${c} fill-rainbow-${c}-dark`,
  ),
  // ...[2, 4].map((n) => `line-clamp-${n}`)
  ...TEXT_COLORS.map((c) => `text-${c} text-${c}-dark`),

  'hover:fill-text-title hover:fill-text-title-dark',
  'hover:fill-rainbow-red hover:fill-rainbow-red-dark',
  'hover:bg-menuHoverBg hover:bg-menuHoverBg-dark',
  'hover:bg-hoverBg hover:bg-hoverBg-dark',
  'hover:border-divider hover:border-divider-dark',
  'group-hover:text-text-title',
  'group-hover:text-text-title-dark',

  ...BG_COLORS.map((c) => `bg-${c} bg-${c}-dark`),
  ...FILL_COLORS.map((c) => `fill-${c} fill-${c}-dark`),
  ...GENERAL_CLASSES.map((c) => `${c} ${c}-dark`),

  ...MARGIN.map((c) => `mt-${c} mb-${c} ml-${c} mr-${c}`),
  ...UTILS,
]
