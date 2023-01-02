import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import ArrowSVG from '@/icons/Arrow'
import Arrow2TopSVG from '@/icons/Arrow2Top'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  padding: 6px;
  width: 100px;
`

export const Item = styled.div`
  ${css.flex('justify-between', 'align-center')};
  padding: 3px 4px;

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`

const ArrowUpIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  transform: rotate(90deg);

  ${Item}:hover & {
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

  ${Item}:hover & {
    color: ${theme('article.title')};
  }
`

const Arrow2BottomIcon = styled(Arrow2TopIcon)`
  transform: rotate(180deg);
`

export const Icon = {
  ArrowUp: ArrowUpIcon,
  ArrowDown: ArrowDownIcon,
  Arrow2Top: Arrow2TopIcon,
  Arrow2Bottom: Arrow2BottomIcon,
}

export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;

  ${Item}:hover & {
    color: ${theme('article.title')};
  }
`
