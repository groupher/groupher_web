import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import BoldSVG from '@/icons/editor/Bold'
import StrikeSVG from '@/icons/editor/Strike'
import LinkSVG from '@/icons/editor/Link'
import HighlightSVG from '@/icons/editor/Highlight'

export const Wrapper = styled.div<{ $hovering: boolean }>`
  ${css.row('align-center')};
  position: absolute;
  left: -8px;
  top: ${({ $hovering }) => ($hovering ? '-6px' : '-12px')};
  opacity: ${({ $hovering }) => ($hovering ? 1 : 0)};
  width: 110px;
  height: 30px;
  padding: 0 5px;
  gap: 0 6px;
  background: ${theme('landing.greyBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 6px;
  z-index: 10;

  transition: all 0.2s;
`
type TItem = TActive & { $opacity?: number }
export const Item = styled.div<TItem>`
  ${css.row('align-center')};
  background: ${({ $active }) => ($active ? theme('rainbow.orangeBg') : 'transparent')};
  border: ${({ $active }) => ($active ? '1px solid' : 'none')};
  border-color: ${({ $active }) => ($active ? theme('divider') : '')};
  opacity: ${({ $opacity }) => $opacity || 1};
  padding: 2px;
  border-radius: 3px;
`
export const IconWrapper = styled.div`
  ${css.size(14)};
  ${css.row('align-both')};
`

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(14)};
    fill: ${theme('article.title')};
  `
}

export const ICON = {
  Bold: commonIcon(BoldSVG),
  Strike: commonIcon(StrikeSVG),
  Link: commonIcon(LinkSVG),
  Highlight: styled(commonIcon(HighlightSVG))`
    fill: ${theme('rainbow.orange')};
  `,
}
