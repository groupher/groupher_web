import styled, { css, theme } from '@/css'
import Img from '@/Img'

import HammerSVG from '@/icons/HammerSolid'
import { GradientText } from '..'
import { getCursorGradient } from '../metric'

export const Wrapper = styled.div`
  ${css.column()};
  width: 50%;
  height: 520px;
  margin-top: 35px;
  position: relative;
`
export const Banner = styled.div`
  margin-left: 44px;
  margin-top: 38px;
  width: 84%;
`
export const Title = styled.div`
  font-size: 22px;
  color: ${theme('article.title')};
  font-weight: 600;
  margin-top: 3px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 16px;
  line-height: 26px;
  margin-top: 5px;
`
export const TechsWrapper = styled.div`
  ${css.rowWrap('align-start')};
  margin-top: 20px;
  gap: 15px 40px;
  height: 440px;
  width: 100%;
  padding: 10px 34px;

  ${css.media.mobile`
    width: 110%;
    padding: 0;
    gap: 10px 15px;
    height: 360px;
    margin-top: -60px;
  `};
`
export const BgWrapper = styled.div`
  opacity: 0.5;
  position: absolute;
  top: 0;
  z-index: -1;
`
export const CADBackground = styled(Img)`
  width: 100%;
  height: 536px;
  border-radius: 20px;
  object-fit: cover;

  ${css.media.mobile`
    height: 360px;
  `};
`
export const BottonNote = styled.div`
  margin-top: 8px;
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.8;

  ${css.media.mobile`
    font-size: 12px;
  `};
`
export const Topping = styled.div`
  ${css.row('align-center')};
  margin-top: -5px;
  margin-bottom: 5px;
  margin-left: -2px;
`
export const HammerIcon = styled(HammerSVG)<{ wallpaper: string }>`
  ${css.size(15)};
  fill: ${({ wallpaper }) => getCursorGradient(wallpaper)};
  margin-right: 4px;
  margin-top: 1px;
  margin-left: 5px;

  ${css.media.mobile`
    ${css.size(15)};
  `};
`
export const HighlightText = styled(GradientText)`
  ${css.row('align-center')};
  font-size: 15px;
  font-weight: 600;
`
