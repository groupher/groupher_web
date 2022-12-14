import styled from 'styled-components'

import type { TActive } from '@/spec'

type TWrapper = { count: number } & TActive

export const Wrapper = styled.div<TWrapper>`
  font-weight: ${({ count }) => (count > 0 ? 500 : 400)};
  opacity: ${({ count }) => (count === 0 ? 0.8 : 1)};
  overflow-y: hidden;
`
export const holder = 1
