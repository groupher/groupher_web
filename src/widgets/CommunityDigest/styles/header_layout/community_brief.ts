import useTwBelt from '~/hooks/useTwBelt'
import useLayout from '~/hooks/useLayout'

import { BRAND_LAYOUT } from '~/const/layout'

export default () => {
  const { cn, fg, bg, br, fill } = useTwBelt()
  const { brandLayout } = useLayout()

  const noMargin = brandLayout === BRAND_LAYOUT.TEXT

  const wrapper =
    'row-center group w-36 min-w-36 h-9 rounded-lg -ml-2.5 pl-2.5 trans-all-200 border border-transparent pointer'

  return {
    wrapper: cn(wrapper, `hover:${br('divider')}`, `hover:${bg('htmlBg')}`),
    panel: cn('border px-2 py-1 pr-0.5 w-40', br('divider')),
    brandPanel: cn(
      wrapper,
      'mt-0.5 mb-2 ml-0 border-none shadow-md h-10 w-36 min-w-36',
      bg('menuHoverBg'),
    ),

    logo: 'size-5 -ml-px mr-1',
    title: cn(
      'text-base bold-sm grow max-w-[80px] line-clamp-1',
      noMargin && 'ml-2',
      fg('text.digest'),
    ),
    optionArrow: cn(
      'size-3 opacity-0 ml-2',
      'group-hover:opacity-100 transition-opacity',
      fill('text.digest'),
    ),
    linkArrow: cn(
      'size-3.5 opacity-0 trans-all-200',
      'group-hover:opacity-80',
      fill('text.digest'),
    ),
    menuItem: cn(
      'row-center group w-36 mt-0.5 mb-0.5 -ml-px mr-0.5 px-2 py-1 pr-1.5 rounded pointer no-underline',
      'border border-transparent',
      'hover:underline',
      `hover:${fg('text.title')}`,
      `hover:${bg('menuHoverBg')}`,
      `hover:${br('divider')}`,
      fg('text.digest'),
    ),
    menuIconBox: 'align-both size-4 mr-1.5',
    menuIcon: cn('size-3.5 opacity-80', fill('text.digest')),
    menuTitle: cn('text-sm grow', `group-hover:${fg('text.title')}`),
  }
}

// export const DisableTippyJump = createGlobalStyle<{ enable: boolean }>`
//   // this is for disable pop animation
//   // should have no animation when navi to sub menu
//   .tippy-box[data-placement^=bottom][data-state='visible'] {
//     transform: ${({ enable }) => (enable ? 'translateY(1px) !important' : 'translateY(5px)')};
//   }
// `
