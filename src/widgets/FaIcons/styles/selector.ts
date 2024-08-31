import type { TTestable, TColorName, TActive } from '~/spec'

import ArrowSVG from '~/icons/ArrowSolid'
import styled, { css, theme, rainbow, rainbowSoft } from '~/css'
import { WithMargin } from '~/widgets/Common'

type TWrapper = TTestable

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  width: auto;
  cursor: pointer;
`
export const InnerWrapper = styled.div`
  ${css.row('align-center')};
  max-width: 70px;
`

type TIconWrapper = { color: TColorName } & TActive
export const IconWrapper = styled.div<TIconWrapper>`
  border: 1px dotted;
  border-color: ${({ $active, color }) => ($active ? rainbow(color) : 'transparent')};
  background: ${({ color }) => rainbowSoft(color)};
  ${css.size(35)};
  ${css.row('align-both')};
  border-radius: 7px;

  ${InnerWrapper}:hover & {
    border-color: ${({ color }) => rainbow(color)};
  }
`
export const ArrowIcon = styled(ArrowSVG)<TActive>`
  ${css.size(12)};
  fill: ${theme('article.info')};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  margin-left: 8px;
  transform: rotate(90deg);

  ${InnerWrapper}:hover & {
    opacity: 1;
  }
`
