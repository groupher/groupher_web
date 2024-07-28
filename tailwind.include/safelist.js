const TEXT_COLORS = ['text-title', 'text-digest', 'text-body', 'text-hint']
const BG_COLORS = ['dot', 'hoverBg', 'htmlBg', 'popover-bg', 'menuHoverBg', 'alphaBg']
const FILL_COLORS = ['text-title', 'text-digest']

const GENERAL_CLASSES = ['border-divider', 'article-hover-linear']
const RAINBOW_COLORS = ['red', 'orange', 'yellow', 'green', 'greenLight', 'cyan', 'blue', 'purple']

const MARGIN = ['px', 0.5, 1, 1.5, 2, 2.5, 3]
const SIZE = [1.5, 2, 2.5, 3, 3.5, 4, 5, 6]

const UTILS = ['border-transparent', 'rounded-sm', 'rounded-md']

// fill-rainbow-red is mainly for delete buttons
const HOVERS = [
  'text-text-title',
  'fill-text-title',
  'fill-rainbow-red',
  'text-rainbow-red',
  'bg-rainbow-redBg',
  'bg-hoverBg',
  'bg-htmlBg',
  'bg-menuHoverBg',
  'border-divider',
]

const GROUP_HOVERS = ['text-text-title', 'fill-rainbow-red']

module.exports = [
  ...RAINBOW_COLORS.map(
    (c) =>
      `text-rainbow-${c} text-rainbow-${c}-dark bg-rainbow-${c} bg-rainbow-${c}-dark bg-rainbow-${c}Bg bg-rainbow-${c}Bg-dark fill-rainbow-${c} fill-rainbow-${c}-dark`,
  ),

  ...TEXT_COLORS.map((c) => `text-${c} text-${c}-dark`),
  ...HOVERS.map((c) => `hover:${c} hover:${c}-dark`),
  ...GROUP_HOVERS.map((c) => `group-hover:${c} hover:${c}-dark`),

  ...BG_COLORS.map((c) => `bg-${c} bg-${c}-dark`),
  ...FILL_COLORS.map((c) => `fill-${c} fill-${c}-dark`),
  ...GENERAL_CLASSES.map((c) => `${c} ${c}-dark`),

  ...MARGIN.map((c) => `mt-${c} mb-${c} ml-${c} mr-${c}`),
  ...SIZE.map((c) => `size-${c}`),
  ...UTILS,
]
