import styled from 'styled-components'

import type { TActive, TColorName } from '@/spec'

import css, { theme } from '@/css'
import { camelize } from '@/fmt'

import DiceSVG from '@/icons/Dice'
import ResetSVG from '@/icons/Reset'

export { Bar, Circle } from '..'

export const BoardsWrapper = styled.div`
  ${css.row('justify-center', 'align-end')};
  gap: 0 16px;
  width: calc(100% + 16px);
  margin-left: -7px;
  margin-top: 26px;

  ${css.media.mobile`
    display: none;
  `}
`
export const MobileBoardsWrapper = styled.div`
  width: 100%;
  margin-top: 26px;
  display: none;

  ${css.media.mobile`
    display: block;
    overflow: scroll;
  `}
`
export const MobileBoardsInnerWrapper = styled.div`
  ${css.row('justify-center', 'align-end')};
  width: 150%;
  gap: 0 18px;
`
type TBoard = { color?: TColorName } & TActive
export const Board = styled.div<TBoard>`
  ${css.column()};
  padding: 8px;
  gap: 6px;
  overflow: hidden;

  width: 33.3%;
  height: 280px;
  background-color: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};

  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('lightText') : 'transparent')};

  ${css.media.mobile`
    width: 50%;
  `}
  transition: all 0.2s;
`
export const ColorsWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 10px;
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
  background-color: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};

  border: 1px dashed;
  border-color: ${({ color }) => theme(`baseColor.${camelize(color)}`)};
  ${css.circle(16)};
  padding: 5px;

  &:hover {
    border: ${({ setable }) => (setable ? '1px solid' : '1px dashed')};
    border-color: ${({ color }) => theme(`baseColor.${camelize(color)}`)};
  }

  transition: all 0.2s;
  cursor: pointer;
`
