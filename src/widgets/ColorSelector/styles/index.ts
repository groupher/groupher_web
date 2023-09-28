import styled from 'styled-components'

import type { TTestable, TActive, TColorName } from '@/spec'

// import Img from '@/Img'
import HookSVG from '@/icons/Hook'
import css, { theme, baseColorTheme, baseColorBgTheme } from '@/css'
import { camelize } from '@/fmt'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.row('align-center')};
  padding: 5px;
`
export const DotWrapper = styled.div`
  ${css.circle(28)};
  ${css.row('align-both')};
`
type TDot = TActive & { color: string; colorName: TColorName; bgMode: boolean }
export const Dot = styled.div<TDot>`
  ${({ $active }) => ($active ? css.circle(20) : css.circle(16))};
  ${css.row('align-both')};
  background-color: ${({ color, bgMode }) => (!bgMode ? color : baseColorBgTheme(color))};

  box-shadow: ${({ $active }) => ($active ? '0px 0px 7px 0px rgb(151 151 151 / 30%)' : '')};

  border: ${({ bgMode }) => (bgMode ? '1px dashed' : 'none')};
  border-color: ${({ colorName }) => baseColorTheme(colorName)};

  &:hover {
    ${css.circle(20)};
    ${css.row('align-both')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
type THookIcon = { colorName: TColorName; bgMode: boolean }
export const HookIcon = styled(HookSVG)<THookIcon>`
  ${css.size(10)};
  fill: ${({ bgMode, colorName }) => (!bgMode ? theme('alphaBg2') : baseColorTheme(colorName))};
`
