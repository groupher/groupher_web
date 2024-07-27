const TEXT_COLORS = ['text-title', 'text-digest', 'text-body', 'text-hint']
const BG_COLORS = ['dot', 'hoverBg', 'htmlBg', 'popover-bg', 'menuHoverBg']
const FILL_COLORS = ['text-title', 'text-digest']

const GENERAL_CLASSES = ['border-divider', 'article-hover-linear']
const RAINBOW_COLORS = ['red', 'orange', 'yellow', 'green', 'greenLight', 'cyan', 'blue', 'purple']

const MARGIN = ['px', 0.5, 1, 1.5, 2, 2.5, 3]
const SIZE = ['size-1.5', 'size-2', 'size-2.5', 'size-3', 'size-3.5', 'size-4', 'size-5', 'size-6']

const UTILS = [
  'border-transparent',
  'group-hover:text-text-title',
  'group-hover:text-text-title-dark',
]

// fill-rainbow-red is mainly for delete buttons
const HOVERS = [
  'fill-text-title',
  'fill-rainbow-red',
  'bg-hoverBg',
  'bg-menuHoverBg',
  'border-divider',
]

module.exports = [
  ...RAINBOW_COLORS.map(
    (c) =>
      `text-rainbow-${c} text-rainbow-${c}-dark bg-rainbow-${c} bg-rainbow-${c}-dark bg-rainbow-${c}Bg bg-rainbow-${c}Bg-dark fill-rainbow-${c} fill-rainbow-${c}-dark`,
  ),

  ...TEXT_COLORS.map((c) => `text-${c} text-${c}-dark`),
  ...HOVERS.map((c) => `hover:${c} hover:${c}-dard`),

  ...BG_COLORS.map((c) => `bg-${c} bg-${c}-dark`),
  ...FILL_COLORS.map((c) => `fill-${c} fill-${c}-dark`),
  ...GENERAL_CLASSES.map((c) => `${c} ${c}-dark`),

  ...MARGIN.map((c) => `mt-${c} mb-${c} ml-${c} mr-${c}`),
  ...SIZE,
  ...UTILS,
]
