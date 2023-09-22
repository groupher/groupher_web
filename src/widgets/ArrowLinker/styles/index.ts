import styled from 'styled-components'

import type { TTestable, TSpace, TPrimaryColor } from '@/spec'

import css, { primaryLink } from '@/css'
import ArrowSVG from '@/icons/ArrowUpRight'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')};

  ${(props) => css.spaceMargins(props)};

  &:hover {
    text-decoration: underline;
  }
`

type TArrowIcon = { fontSize: number; bold?: boolean } & TPrimaryColor

export const ArrowIcon = styled(ArrowSVG)<TArrowIcon>`
  fill: ${({ primaryColor }) => primaryLink(primaryColor)};
  width: ${({ fontSize }) => `${fontSize - 1}px`};
  height: ${({ fontSize }) => `${fontSize - 1}px`};
  margin-left: 1px;
  opacity: 0.6;
`
export const Title = styled.span<TArrowIcon>`
  color: ${({ primaryColor }) => primaryLink(primaryColor)};
  display: inline-block;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-weight: ${({ bold }) => (bold ? 550 : 400)};
`
