import styled from '~/css'
import type { TTestable } from '~/spec'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  /* line-break: anywhere;
  word-wrap: break-word; */
  width: auto;
`

export const Title = styled.div``
