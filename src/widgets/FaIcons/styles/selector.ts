import styled from 'styled-components'

import type { TTestable, TSpace, TColorName, TActive } from '@/spec'

import ArrowSVG from '@/icons/ArrowSolid'

import { camelize } from '@/utils/fmt'
import css, { theme } from '@/utils/css'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  width: auto;

  ${(props) => css.spaceMargins(props)};
  cursor: pointer;
`
export const InnerWrapper = styled.div`
  ${css.flex('align-center')};
  max-width: 70px;
`

type TIconWrapper = { color: TColorName } & TActive
export const IconWrapper = styled.div<TIconWrapper>`
  border: 1px dotted;
  border-color: ${({ $active, color }) =>
    $active ? theme(`baseColor.${camelize(color)}`) : 'transparent'};
  background: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};
  ${css.size(35)};
  ${css.flex('align-both')};
  border-radius: 7px;

  ${InnerWrapper}:hover & {
    border-color: ${({ color }) => theme(`baseColor.${camelize(color)}`)};
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
