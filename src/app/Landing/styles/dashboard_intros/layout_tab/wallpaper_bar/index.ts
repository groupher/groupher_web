import type { TActive } from '@/spec'
import styled, { css, theme } from '@/css'

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
export const BallWrapper = styled.div<TActive>`
  ${({ $active }) => ($active ? css.circle(38) : css.circle(30))};
  ${css.row('align-both')};
  border-radius: 100%;
  background: ${({ $active }) => ($active ? theme('htmlBg') : theme('alphaBg2'))};
  padding: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &:hover {
    border-color: ${theme('article.digest')};
    ${css.circle(38)};
    box-shadow: ${css.cardShadow};
    cursor: pointer;
  }

  transition: all 0.1s linear;
`
type TColorBall = { background: string } & TActive
export const ColorBall = styled.div<TColorBall>`
  ${({ $active }) => ($active ? css.circle(32) : css.circle(24))};

  background: ${({ background }) => background || 'transparent'};
  background-size: 200px;

  ${BallWrapper}:hover & {
    ${css.circle(30)};
  }

  transition: all 0.1s linear;
`
export const CustomBall = styled(BallWrapper)`
  background: ${theme('alphaBg2')};
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
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
