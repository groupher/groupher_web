import styled from 'styled-components'

import type { TTestable, TSpace } from '@/spec'

import css, { theme } from '@/css'
import ArrowSVG from '@/icons/ArrowUpRight'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')};

  ${(props) => css.spaceMargins(props)};
`

export const ArrowIcon = styled(ArrowSVG)<{ fontSize: number }>`
  fill: ${theme('link')};
  width: ${({ fontSize }) => `${fontSize - 1}px`};
  height: ${({ fontSize }) => `${fontSize - 1}px`};
  margin-left: 1px;
  opacity: 0.6;
`

export const Title = styled.span<{ fontSize: number }>`
  display: inline-block;
  font-size: ${({ fontSize }) => `${fontSize}px`};
`
