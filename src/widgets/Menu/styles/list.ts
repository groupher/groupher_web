import styled from 'styled-components'

import type { TActive } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/css'

type TWrapper = { $popWidth: number }
export const Wrapper = styled.div<TWrapper>`
  width: ${({ $popWidth }) => `${$popWidth}px`};
`
type TItem = TActive
export const Item = styled.div<TItem>`
  ${css.row('align-center')};
  padding: 2px 8px;
  border-radius: 5px;
  line-height: 30px;
  margin-top: 1px;
  margin-bottom: 1px;

  background: ${({ $active }) => ($active ? theme('menuHoverBg') : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? theme('button.boxShadow') : '')};
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};

  &:hover {
    font-weight: 500;
    background: ${theme('menuHoverBg')};
    box-shadow: ${theme('button.boxShadow')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const Main = styled.div``

export const Title = styled.div`
  font-size: 14px;
  font-weight: 400;

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
