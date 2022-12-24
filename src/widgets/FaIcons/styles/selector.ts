import styled from 'styled-components'

import type { TTestable, TSpace, TColorName, TActive } from '@/spec'

import ArrowSVG from '@/icons/ArrowSolid'

import { camelize } from '@/utils/fmt'
import css, { theme } from '@/utils/css'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  width: auto;

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
  cursor: pointer;
`
export const InnerWrapper = styled.div`
  ${css.flex('align-center')};
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

  ${Wrapper}:hover & {
    border-color: ${({ color }) => theme(`baseColor.${camelize(color)}`)};
  }
`
export const ArrowIcon = styled(ArrowSVG)<TActive>`
  ${css.size(12)};
  fill: ${theme('article.info')};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  margin-left: 8px;
  transform: rotate(90deg);

  ${Wrapper}:hover & {
    opacity: 1;
  }
`
