import styled from 'styled-components'

import type { TTestable, TActive } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/css'

type TWrapper = TTestable & { width: number }

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.column()};
  width: ${({ width }) => `${width}px`};
`
export const Option = styled.div<TActive>`
  position: relative;
  padding: 10px 15px;
  padding-left: 40px;
  background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};

  &:hover {
    cursor: pointer;
    background: ${theme('hoverBg')};
  }
`
export const ActiveDot = styled.div`
  ${css.circle(6)};
  background: ${theme('article.info')};
  position: absolute;
  left: 20px;
  top: 18px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-top: 2px;
`
