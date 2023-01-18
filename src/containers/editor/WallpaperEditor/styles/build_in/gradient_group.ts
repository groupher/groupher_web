import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { animate, theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex()};
  width: calc(100% + 30px);
  flex-wrap: wrap;
  gap: 0 12px;
  margin-top: 10px;
`
export const BallWrapper = styled.div<TActive>`
  ${css.size(36)};
  ${css.flex('align-both')};
  border-radius: 100%;
  border: 1.5px solid;
  border-color: ${({ $active }) => ($active ? theme('article.title') : 'transparent')};
  padding: 3px;
  box-shadow: ${({ $active }) =>
    $active
      ? 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'
      : 'transparent'};
  margin-bottom: 10px;

  &:hover {
    border-color: ${theme('article.digest')};
    box-shadow: ${css.cardShadow};
    cursor: pointer;
  }

  transition: all 0.1s linear;
`
type TColorBall = { background?: string } & TActive
export const ColorBall = styled.div<TColorBall>`
  ${({ $active }) => ($active ? css.circle(28) : css.circle(30))};

  background: ${({ background }) => background || 'transparent'};
  background-size: 200px;

  &:active {
    animation: ${animate.breath} 2s linear;
  }

  transition: all 0.1s linear;
`

export const CustomColorBall = styled(ColorBall)`
  ${({ $active }) => ($active ? css.circle(26) : css.circle(30))};
  ${css.flex('align-both')};
  background: ${theme('hoverBg')};
  background: conic-gradient(
    rgb(235, 87, 87),
    rgb(78, 167, 252),
    rgb(76, 183, 130),
    rgb(242, 201, 76),
    rgb(250, 96, 122)
  );

  &:hover {
    transform: rotate(180deg);
    cursor: pointer;
  }

  transition: all 0.3s;
`
export const ActiveSign = styled.div`
  ${css.size(24)};
  background: ${theme('divider')};
  position: absolute;
  top: -1px;
  right: -1px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 30px;
  z-index: 3;
  border: 1px solid;
  border-color: ${theme('article.title')};
`
