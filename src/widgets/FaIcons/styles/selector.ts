import styled from 'styled-components'

import type { TTestable, TSpace, TColorName, TActive } from '@/spec'

import ArrowSVG from '@/icons/ArrowSolid'

import css, { theme, baseColorTheme, baseColorBgTheme } from '@/css'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  width: auto;

  ${(props) => css.spaceMargins(props)};
  cursor: pointer;
`
export const InnerWrapper = styled.div`
  ${css.row('align-center')};
  max-width: 70px;
`

type TIconWrapper = { color: TColorName } & TActive
export const IconWrapper = styled.div<TIconWrapper>`
  border: 1px dotted;
  border-color: ${({ $active, color }) => ($active ? baseColorTheme(color) : 'transparent')};
  background: ${({ color }) => baseColorBgTheme(color)};
  ${css.size(35)};
  ${css.row('align-both')};
  border-radius: 7px;

  ${InnerWrapper}:hover & {
    border-color: ${({ color }) => baseColorTheme(color)};
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
