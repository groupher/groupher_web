import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { animate, theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-both')};
  width: calc(100%);
  margin-top: 60px;
  gap: 0 18px;
`
export const Block = styled.div``

export const BallWrapper = styled.div<TActive>`
  ${css.size(30)};
  ${css.flex('align-both')};
  border-radius: 100%;
  border: 2px solid;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : 'transparent')};
  padding: 5px;
  box-shadow: ${({ $active }) =>
    $active
      ? 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'
      : 'transparent'};
  margin-bottom: 10px;
  opacity: 0.8;

  &:hover {
    border-color: ${theme('article.digest')};
    box-shadow: ${css.cardShadow};
    cursor: pointer;
  }

  transition: all 0.1s linear;
`

export const CustomBall = styled(BallWrapper)`
  background: ${theme('divider')};
  color: ${theme('article.digest')};
  font-weight: 600;
  font-size: 15px;
`

type TColorBall = { background: string } & TActive
export const ColorBall = styled.div<TColorBall>`
  ${({ $active }) => ($active ? css.circle(22) : css.circle(30))};

  background: ${({ background }) => background || 'transparent'};
  background-size: 200px;

  &:active {
    animation: ${animate.breath} 2s linear;
  }

  transition: all 0.1s linear;
`
