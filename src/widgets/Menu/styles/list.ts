import styled from 'styled-components'

import type { TActive, TColor } from '@/spec'

// import Img from '@/Img'
import css, { theme, rainbowLight, rainbow } from '@/css'

type TWrapper = { $popWidth: number }
export const Wrapper = styled.div<TWrapper>`
  width: ${({ $popWidth }) => `${$popWidth}px`};
`
type TItem = TActive & TColor
export const Item = styled.div<TItem>`
  ${css.row('align-center')};
  padding: 2px 8px;
  border-radius: 5px;
  line-height: 32px;

  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  background: ${({ $active, $color }) => ($active ? rainbowLight($color) : 'transparent')};

  color: ${({ $active, $color }) => ($active ? rainbow($color) : theme('article.digest'))};

  &:hover {
    font-weight: 500;
    background: ${({ $active, $color }) => ($active ? rainbowLight($color) : theme('hoverBg'))};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const Main = styled.div``

export const Title = styled.div`
  font-size: 14px;
  ${Item}:hover & {
    color: ${theme('article.title')};
  }
  transition: all 0.15s;
`

export const FullItem = styled(Item)`
  ${css.row('align-start')};
  padding: 2px 8px;
`
export const FullIcon = styled.div`
  margin-top: 10px;
  margin-right: 5px;
`
export const FullTitle = styled(Title)`
  font-weight: bold;
`
export const Desc = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-top: -8px;

  ${Item}:hover & {
    color: ${theme('article.digest')};
    opacity: 1;
  }

  transition: all 0.1s;
`
