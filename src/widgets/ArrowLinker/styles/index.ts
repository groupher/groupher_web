import styled from 'styled-components'

import type { TTestable, TSpace } from '@/spec'

import css, { theme } from '@/css'
import ArrowSVG from '@/icons/ArrowUpRight'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center')};

  ${(props) => css.spaceMargins(props)};
`

export const ArrowIcon = styled(ArrowSVG)<{ size: number }>`
  fill: ${theme('link')};
  width: ${({ size }) => `${size - 1}px`};
  height: ${({ size }) => `${size - 1}px`};
  margin-left: 1px;
  opacity: 0.6;
`

export const Title = styled.span<{ size: number }>`
  display: inline-block;
  font-size: ${({ size }) => `${size}px`};
`
