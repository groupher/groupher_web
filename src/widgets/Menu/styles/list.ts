import styled from 'styled-components'

import type { TActive, TPrimaryColor } from '@/spec'

// import Img from '@/Img'
import css, { theme, primaryLightTheme, rainbowTheme } from '@/css'

type TWrapper = { popWidth: number }
export const Wrapper = styled.div<TWrapper>`
  width: ${({ popWidth }) => `${popWidth}px`};
`
type TItem = TPrimaryColor & TActive
export const Item = styled.div<TItem>`
  ${css.row('align-center')};
  padding: 2px 8px;
  border-radius: 5px;
  line-height: 32px;

  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  background: ${({ $active, primaryColor }) =>
    $active ? primaryLightTheme(primaryColor) : 'transparent'};

  color: ${({ $active, primaryColor }) =>
    $active ? rainbowTheme(primaryColor) : theme('article.digest')};

  &:hover {
    font-weight: 500;
    background: ${({ $active, primaryColor }) =>
      $active ? primaryLightTheme(primaryColor) : theme('hoverBg')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const Main = styled.div``

export const Title = styled.div`
  font-size: 14px;
`
// full version

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
`
