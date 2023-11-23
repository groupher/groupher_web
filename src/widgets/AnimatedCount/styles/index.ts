import styled from 'styled-components'

import type { TActive } from '@/spec'

import { WithMargin } from '@/widgets/Common'

type TWrapper = { $count: number } & TActive

export const Wrapper = styled(WithMargin)<TWrapper>`
  font-weight: ${({ $count }) => ($count > 0 ? 450 : 400)};
  filter: brightness(1.1);
`
export const holder = 1
