import styled from 'styled-components'

import type { TActive, TColor } from '@/spec'
import { THREAD } from '@/constant/thread'

import DiscussSVG from '@/icons/DiscussSolid'
import TadaSVG from '@/icons/Tada'
import GuideSVG from '@/icons/Book'
import KanbanSVG from '@/icons/Kanban'

import css, { rainbow, rainbowLight, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  gap: 0 64px;
  width: 100%;
`
export const TabItem = styled.div<TActive>`
  ${css.column('align-both')};
  width: 162px;
  border-bottom: 2px solid;
  border-bottom-color: ${({ $active }) => ($active ? theme('article.title') : 'transparent')};
  padding-bottom: 22px;
  cursor: pointer;

  filter: ${({ $active }) => ($active ? 'saturate(1)' : 'saturate(0)')};
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};

  &:hover {
    opacity: 1;
    border-bottom-color: ${({ $active }) => ($active ? theme('article.title') : theme('hoverBg'))};
  }
`
type TIconBox = TColor & TActive
export const IconBox = styled.div<TIconBox>`
  ${css.size(40)};
  border-radius: 6px;
  background: ${({ $color, $active }) => ($active ? rainbowLight($color) : 'transparent')};
  position: relative;
  border: 1px dotted;
  border-color: ${({ $color }) => rainbow($color)};
  transform: scale(0.9);
`

type TIcon = TColor
const commonIcon = (comp) => {
  return styled(comp)<TIcon>`
    ${css.size(28)};
    fill: ${({ $color }) => rainbow($color)};
    position: absolute;
    bottom: -8px;
    right: -8px;
  `
}

export const ICON = {
  [THREAD.POST]: commonIcon(DiscussSVG),
  [THREAD.KANBAN]: styled(commonIcon(KanbanSVG))`
    transform: rotate(180deg) rotateY(180deg);
    bottom: -9px;
    right: -8px;
  `,
  [THREAD.CHANGELOG]: styled(commonIcon(TadaSVG))`
    ${css.size(26)};
    bottom: -9px;
    right: -8px;
  `,
  [THREAD.DOC]: styled(commonIcon(GuideSVG))`
    bottom: -9px;
    right: -8px;
  `,
}

export const Title = styled.div<TActive>`
  font-size: 18px;
  margin-top: 18px;
  margin-bottom: 5px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-weight: 500;

  ${TabItem}:hover & {
    color: ${theme('article.title')};
  }

  transition: all 0.2s;
`
export const Desc = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
`
