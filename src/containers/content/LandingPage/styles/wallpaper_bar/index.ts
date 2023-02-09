import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { animate, theme } from '@/utils/css'

import { LineDivider } from '@/widgets/Common'

import ThemeSVG from '@/icons/Theme'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')}
  width: 100%;
  margin-top: 60px;
`
export const MainWrapper = styled.div`
  ${css.flex('align-both')};
  gap: 0 18px;
`
export const Desc = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  margin-top: 25px;
  font-size: 13px;
  opacity: 0.8;
`
export const BallWrapper = styled.div<TActive>`
  ${css.size(30)};
  ${css.flex('align-both')};
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
  border: 1px solid;
  border-color: ${theme('divider')};
  color: ${theme('article.digest')};
  font-weight: 600;
  font-size: 15px;
  box-shadow: ${css.cardShadow};
  cursor: pointer;
`
export const ThemeIcon = styled(ThemeSVG)`
  ${css.size(20)};
  fill: ${theme('article.info')};
`

export const Divider = styled(LineDivider)`
  background: ${theme('article.digest')};
  opacity: 0.6;
`