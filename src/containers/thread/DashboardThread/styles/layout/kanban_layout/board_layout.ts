import styled from 'styled-components'

import type { TActive, TColorName } from '@/spec'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import DiceSVG from '@/icons/Dice'

export { Bar, Circle } from '..'

export const BoardsWrapper = styled.div`
  ${css.flex('justify-center', 'align-end')};
  gap: 0 18px;
  width: calc(100% + 100px);
  margin-left: -45px;
  margin-top: 26px;
`
type TBoard = { color?: TColorName } & TActive
export const Board = styled.div<TBoard>`
  ${css.flexColumn()};
  padding: 8px;
  gap: 6px;
  overflow: hidden;

  width: 33%;
  height: 280px;
  background-color: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};

  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('lightText') : 'transparent')};

  transition: all 0.2s;
`
export const ColorsWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 10px;
  margin-bottom: 18px;
`

export const Action = styled.div<TActive>`
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  font-size: 12px;
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};
  margin-top: 4px;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  transition: all 0.2s;
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
  ${css.flex('align-both')};
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
