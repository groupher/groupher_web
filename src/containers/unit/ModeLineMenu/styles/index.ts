import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-both')};
  height: 100%;
  padding: 0 6vw;
`
export const Title = styled.div``
