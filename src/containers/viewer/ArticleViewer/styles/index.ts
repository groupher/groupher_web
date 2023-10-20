import styled from 'styled-components'

import type { TTestable } from '@/spec'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  padding: 15px 66px;
`
export const CommentsWrapper = styled.div`
  min-height: 400px;
  margin-top: 32px;
  border-radius: 5px;
`
