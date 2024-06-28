import styled from '~/css'

import type { TTestable } from '~/spec'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  padding: 15px 66px;
  min-height: 1800px;
  border: 2px solid tomato;
`
export const CommentsWrapper = styled.div`
  min-height: 400px;
  margin-top: 32px;
  border-radius: 5px;
`
