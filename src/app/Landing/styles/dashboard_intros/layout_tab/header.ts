import styled, { css, theme, rainbow } from '@/css'
import type { TColor } from '@/spec'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  padding: 0 16px;
  position: relative;
`
export const ColorBox = styled.div`
  ${css.size(30)};
  ${css.row('align-both')};
  border: 1px solid;
  border-radius: 10px;
  border-color: ${theme('divider')};
  background: ${theme('htmlBg')};

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;

  &:hover {
    border-color: ${theme('hint')};
  }
`
export const ColorBall = styled.div<TColor>`
  ${css.size(20)};
  border-radius: 5px;
  background: ${({ $color }) => rainbow($color)};
  opacity: 0.6;
`
export const Brand = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div`
  font-size: 15px;
  ${theme('article.title')};
  margin-left: 6px;
`
