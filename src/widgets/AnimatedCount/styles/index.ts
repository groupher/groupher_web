import styled from 'styled-components'

import type { TActive } from '@/spec'

import { WithMargin } from '@/widgets/Common'

type TWrapper = { count: number } & TActive

export const Wrapper = styled(WithMargin)<TWrapper>`
  font-weight: ${({ count }) => (count > 0 ? 500 : 400)};
  opacity: ${({ count }) => (count === 0 ? 0.85 : 1)};
  /* filter: brightness(1.2); */
  color: tomato;
`
export const holder = 1
