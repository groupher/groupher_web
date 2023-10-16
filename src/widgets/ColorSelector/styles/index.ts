import styled from 'styled-components'

import type { TTestable, TActive, TColorName } from '@/spec'

import HookSVG from '@/icons/Hook'
import css, { theme, rainbow, rainbowLight } from '@/css'

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
type TDot = TActive & { colorName: TColorName; bgMode: boolean }
export const Dot = styled.div<TDot>`
  ${({ $active }) => ($active ? css.circle(20) : css.circle(16))};
  ${css.row('align-both')};
  background-color: ${({ colorName, bgMode }) =>
    !bgMode ? rainbow(colorName, 'rainbow.blackRow') : rainbowLight(colorName)};

  box-shadow: ${({ $active }) => ($active ? '0px 0px 7px 0px rgb(151 151 151 / 30%)' : '')};

  border: ${({ bgMode }) => (bgMode ? '1px dashed' : '1px solid')};
  border-color: ${({ colorName }) => rainbow(colorName, 'divider')};

  &:hover {
    ${css.circle(20)};
    ${css.row('align-both')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const HookIcon = styled(HookSVG)`
  ${css.size(10)};
  fill: ${theme('button.fg')};
`
