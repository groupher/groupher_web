import styled from 'styled-components'

import type { TTestable, TActive, TColorName } from '@/spec'

// import Img from '@/Img'
import HookSVG from '@/icons/Hook'
import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center')};
  padding: 5px;
`
export const DotWrapper = styled.div`
  ${css.circle(28)};
  ${css.flex('align-both')};
`
type TDot = TActive & { color: string; colorName: TColorName; bgMode: boolean }
export const Dot = styled.div<TDot>`
  ${({ $active }) => ($active ? css.circle(20) : css.circle(16))};
  ${css.flex('align-both')};
  background-color: ${({ color, bgMode, colorName }) =>
    !bgMode ? color : theme(`baseColor.${camelize(colorName)}Bg`)};

  box-shadow: ${({ $active }) => ($active ? '0px 0px 7px 0px rgb(151 151 151 / 30%)' : '')};

  border: ${({ bgMode }) => (bgMode ? '1px dashed' : 'none')};
  border-color: ${({ colorName }) => theme(`baseColor.${camelize(colorName)}`)};

  &:hover {
    ${css.circle(20)};
    ${css.flex('align-both')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
type THookIcon = { colorName: TColorName; bgMode: boolean }
export const HookIcon = styled(HookSVG)<THookIcon>`
  ${css.size(10)};
  fill: ${({ bgMode, colorName }) =>
    !bgMode ? theme('alphaBg2') : theme(`baseColor.${camelize(colorName)}`)};
`
