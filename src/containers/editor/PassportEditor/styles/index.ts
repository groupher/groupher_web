import styled from 'styled-components'

import type { TTestable } from '@/spec'
// import { theme } from '@/utils/themes'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  padding: 20px 30px;
  //
`
export const Title = styled.div``
