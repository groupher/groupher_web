const GENERAL = [
  'border-divider',
  'article-hover-linear',
  'count-highlight',
  'footer-inner-shadow',
  'sexy-border-20',
  'sexy-border-35',
  'sexy-border-40',
  'shadow-md',
  'shadow-lg',
  'shadow-xl',
]

const TEXT_COLORS = [
  'text-title',
  'text-digest',
  'text-body',
  'text-hint',
  'text-invert',
  'button-fg',
]
const BG_COLORS = [
  'dot',
  'divider',
  'hoverBg',
  'htmlBg',
  'popover-bg',
  'menuHoverBg',
  'alphaBg',
  'snackBar',
  'button-redBg',
  'button-toggle',
]
const FILL_COLORS = ['text-title', 'text-digest', 'button-fg', 'heightIcon']
// for fg,bg & fill
const RAINBOW_COLORS = ['red', 'orange', 'yellow', 'green', 'greenLight', 'cyan', 'blue', 'purple']

const MARGIN = ['px', 0.5, 1, 1.5, 2, 2.5, 3, 4, 5]
const SIZE = [1.5, 2, 2.5, 3, 3.5, 4, 5, 6]

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
  'bg-alphaBg2',
  'border-divider',
  'border-text-digest',
]

const GROUP_HOVERS = ['text-text-title', 'fill-rainbow-red']
const CONTAINERS = ['container-home', 'container-community', 'container-community_sidebar']
const UTILS = [
  'border-transparent',
  'rounded-sm',
  'rounded-md',
  'bg-gradient-to-r to-transparent',
  // TODO: extract those from ~/const/container
  'max-w-[1200px]',
  '-ml-40',
  'mr-36',
  'pl-40',
  'pr-36',
  'saturate-150',
  'brightness-125',
  'select-none',
  'touch-manipulation',
  'outline-none',
  'bg-none',
  'rounded-3xl',
]

module.exports = [
  ...GENERAL.map((c) => `${c} ${c}-dark`),

  ...TEXT_COLORS.map((c) => `text-${c} text-${c}-dark`),
  ...BG_COLORS.map((c) => `bg-${c} bg-${c}-dark`),
  ...FILL_COLORS.map((c) => `fill-${c} fill-${c}-dark`),
  ...RAINBOW_COLORS.map(
    (c) =>
      `text-rainbow-${c} text-rainbow-${c}-dark bg-rainbow-${c} bg-rainbow-${c}-dark bg-rainbow-${c}Bg bg-rainbow-${c}Bg-dark fill-rainbow-${c} fill-rainbow-${c}-dark from-rainbow-${c}Bg from-rainbow-${c}Bg-dark 'border-rainbow-${c} border-rainbow-${c}-dark'`,
  ),

  ...MARGIN.map((c) => `mt-${c} mb-${c} ml-${c} mr-${c}`),
  ...SIZE.map((c) => `size-${c}`),

  ...HOVERS.map((c) => `hover:${c} hover:${c}-dark`),
  ...GROUP_HOVERS.map((c) => `group-hover:${c} hover:${c}-dark`),

  ...CONTAINERS,
  ...UTILS,
]
