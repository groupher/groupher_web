import styled from 'styled-components'

import type { TTestable, TSpace, TColor } from '@/spec'

import css, { rainbowLink } from '@/css'
import ArrowSVG from '@/icons/ArrowUpRight'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.article.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')};

  ${(props) => css.spaceMargins(props)};

  &:hover {
    text-decoration: underline;
  }
`

type TArrowIcon = { fontSize: number; bold?: boolean } & TColor

export const ArrowIcon = styled(ArrowSVG)<TArrowIcon>`
  fill: ${({ $color }) => rainbowLink($color)};
  width: ${({ fontSize }) => `${fontSize - 1}px`};
  height: ${({ fontSize }) => `${fontSize - 1}px`};
  margin-left: 1px;
  opacity: 0.6;
`
export const Title = styled.span<TArrowIcon>`
  color: ${({ $color }) => rainbowLink($color)};
  display: inline-block;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-weight: ${({ bold }) => (bold ? 550 : 400)};
`
