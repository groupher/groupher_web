import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { animate, theme } from '@/css'

import { LineDivider } from '@/widgets/Common'

import ThemeSVG from '@/icons/Theme'

export const Wrapper = styled.div`
  ${css.column('align-both')}
  width: 100%;
  margin-top: 60px;

  ${css.media.mobile`
    margin-top: 30px;
  `};
`
export const MainWrapper = styled.div`
  ${css.row('align-both')};
  gap: 0 18px;

  ${css.media.mobile`
    transform: scale(0.7);
  `};
`
export const Desc = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  margin-top: 25px;
  font-size: 12px;
  opacity: 0.8;

  ${css.media.mobile`
    transform: scale(0.9);
    margin-top: 15px;
  `};
`
export const BallWrapper = styled.div<TActive>`
  ${css.size(30)};
  ${css.row('align-both')};
  border-radius: 100%;
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : 'transparent')};
  padding: 4px;
  box-shadow: ${({ $active }) =>
    $active
      ? 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'
      : 'transparent'};

  &:hover {
    border-color: ${theme('article.digest')};
    box-shadow: ${css.cardShadow};
    cursor: pointer;
  }

  transition: all 0.1s linear;
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
export const CustomBall = styled(BallWrapper)`
  background: ${theme('hoverBg')};
  border-color: ${theme('divider')};
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
`
export const ThemeIcon = styled(ThemeSVG)`
  ${css.size(25)};
  fill: ${theme('article.digest')};
  opacity: 0.7;
  z-index: 2;

  ${CustomBall}:hover & {
    opacity: 1;
  }
`

export const Divider = styled(LineDivider)`
  background: ${theme('article.digest')};
  opacity: 0.6;
`
