import styled from 'styled-components'

import MENU from '@/constant/menu'

// import type { TTestable } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'

import ArrowSVG from '@/icons/Arrow'
import Arrow2TopSVG from '@/icons/Arrow2Top'

export const Wrapper = styled.div`
  ${css.flex('justify-between', 'align-center')};
  padding: 3px 4px;

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`

export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`

const ArrowLeftIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
const ArrowRightIcon = styled(ArrowLeftIcon)`
  transform: rotate(-180deg);
`

const ArrowUpIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  transform: rotate(90deg);

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(-90deg);
`
const Arrow2TopIcon = styled(Arrow2TopSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: -1px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`

const Arrow2BottomIcon = styled(Arrow2TopIcon)`
  transform: rotate(180deg);
`

export const MenuIcon = {
  [MENU.ARROW_LEFT]: ArrowLeftIcon,
  [MENU.ARROW_RIGHT]: ArrowRightIcon,

  [MENU.ARROW_UP]: ArrowUpIcon,
  [MENU.ARROW_DOWN]: ArrowDownIcon,

  [MENU.ARROW_TO_TOP]: Arrow2TopIcon,
  [MENU.ARROW_TO_BOTTOM]: Arrow2BottomIcon,
}
