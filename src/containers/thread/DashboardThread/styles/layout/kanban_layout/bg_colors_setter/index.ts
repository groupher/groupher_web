import type { TActive, TColorName } from '@/spec'

import styled, { css, theme, rainbow, rainbowLight } from '@/css'

import DiceSVG from '@/icons/Dice'
import ResetSVG from '@/icons/Reset'

export { Bar, Circle } from '..'

export const ColorsWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 10px;
  width: 94%;
`
export const Action = styled.div<TActive>`
  ${css.row('align-center')};
  color: ${theme('article.info')};
  font-size: 12px;
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};
  margin-top: 5px;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  transition: all 0.2s;
`
export const ResetIcon = styled(ResetSVG)`
  ${css.size(13)};
  fill: ${theme('article.info')};
  margin-right: 5px;
`

export const DiceIcon = styled(DiceSVG)<{ rotate: number }>`
  margin-top: -1px;
  ${css.size(13)};
  fill: ${theme('article.info')};
  margin-right: 5px;
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
  transition: all 0.2s;
`

export const Preset = styled.div<{ setable?: boolean }>`
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  gap: 0 8px;
  width: 80px;
  height: 30px;

  &:hover {
    cursor: ${({ setable }) => (!setable ? 'pointer' : 'normal')};
    border-color: ${theme('article.digest')};
    border-color: ${({ setable }) => (!setable ? theme('article.digest') : theme('divider'))};
    box-shadow: ${css.cardShadow};
  }

  transition: all 0.2s;
`

type TColorBall = { color: TColorName; setable?: boolean }
export const ColorBall = styled.div<TColorBall>`
  background-color: ${({ color }) => rainbowLight(color)};

  border: 1px dashed;
  border-color: ${({ color }) => rainbow(color)};
  ${css.circle(16)};
  padding: 5px;

  &:hover {
    border: ${({ setable }) => (setable ? '1px solid' : '1px dashed')};
    border-color: ${({ color }) => rainbow(color)};
  }

  transition: all 0.2s;
  cursor: pointer;
`
