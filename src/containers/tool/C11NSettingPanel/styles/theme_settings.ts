import styled from 'styled-components'

import type { TTestable } from '@/spec'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  margin-top: 16px;
  /* margin-left: 30px; */
`
export const Title = styled.div``
