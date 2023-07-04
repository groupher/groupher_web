import styled from 'styled-components'

import type { TTestable } from '@/spec'
// import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  padding: 0 5px;
  font-size: 13px;
`
export const Title = styled.div``
