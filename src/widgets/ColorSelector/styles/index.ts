import type { TTestable, TActive, TColorName } from '~/spec'
import { COLOR_NAME } from '~/const/colors'

import HookSVG from '~/icons/Hook'
import styled, { css, theme, rainbow, rainbowSoft } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
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
  ${({ $active, colorName }) =>
    $active ? css.circle(20) : css.circle(colorName === COLOR_NAME.BLACK ? 18 : 16)};
  ${css.row('align-both')};
  background-color: ${({ colorName, bgMode }) =>
    !bgMode ? rainbow(colorName, 'rainbow.blackRow') : rainbowSoft(colorName)};

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
