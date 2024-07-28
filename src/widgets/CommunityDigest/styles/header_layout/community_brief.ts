import { createGlobalStyle } from 'styled-components'

import useTwBelt from '~/hooks/useTwBelt'
import useLayout from '~/hooks/useLayout'

import { BRAND_LAYOUT } from '~/const/layout'

import styled, { css, theme } from '~/css'

import DiscussSVG from '~/icons/Discuss'
import GithubSVG from '~/icons/Github8'
import GlobalSVG from '~/icons/social/Global'
import PlusSVG from '~/icons/PlusCircle'

export default () => {
  const { cn, fg, bg, br, fill } = useTwBelt()
  const { brandLayout } = useLayout()

  const noMargin = brandLayout === BRAND_LAYOUT.TEXT

  const wrapper =
    'row-center group w-36 min-w-36 h-9 rounded-lg -ml-2.5 pl-2.5 trans-all-200 border border-transparent pointer'

  return {
    wrapper: cn(wrapper, `hover:${br('divider')}`, `hover:${bg('htmlBg')}`),
    panel: cn('border px-2 py-1 pr-0.5 w-36', br('divider')),
    brandPanel: cn(wrapper, 'mb-2 border-none'),
    menuItem: cn(
      'row-center group w-full mt-0.5 mb-0.5 -ml-1 px-1 py-1 pr-0.5 rounded pointer no-underline',
      'border border-transparent',
      'hover:underline',
      `hover:${fg('text.title')}`,
      `hover:${bg('menuHoverBg')}`,
      `hover:${br('divider')}`,
      fg('text.digest'),
    ),
    logo: 'size-5 -ml-px mr-1',
    title: cn('text-base bold-sm max-w-[80px] line-clamp-1', noMargin && 'ml-2', fg('text.digest')),
    optionArrow: cn(
      'size-3 mr-1.5 opacity-0',
      'group-hover:opacity-100 trans-all-200',
      fill('text.digest'),
    ),
    linkArrow: cn(
      'size-3.5 opacity-0 trans-all-200',
      'group-hover:opacity-80',
      fill('text.digest'),
    ),
  }
}

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(14)};
    fill: ${theme('hint')};
    margin-right: 11px;
  `
}

export const Icon = {
  Global: commonIcon(GlobalSVG),
  Github: styled(commonIcon(GithubSVG))`
    margin-left: 2px;
    margin-right: 12px;
    ${css.size(12)};
  `,
  Discuss: commonIcon(DiscussSVG),
  Plus: styled(commonIcon(PlusSVG))`
    ${css.size(15)};
    margin-left: 1px;
    margin-right: 10px;
  `,
}

export const DisableTippyJump = createGlobalStyle<{ enable: boolean }>`
  // this is for disable pop animation
  // should have no animation when navi to sub menu
  .tippy-box[data-placement^=bottom][data-state='visible'] {
    transform: ${({ enable }) => (enable ? 'translateY(1px) !important' : 'translateY(5px)')};
  }
`
