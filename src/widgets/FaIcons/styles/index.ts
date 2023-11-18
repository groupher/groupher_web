import styled from 'styled-components'

import type { TTestable } from '@/spec'
import { WithMargin } from '@/widgets/Common'

type TWrapper = { opacity?: number } & TTestable

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  opacity: ${({ opacity }) => opacity || 1};
`

export const Title = styled.div``
