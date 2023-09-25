import styled from 'styled-components'

import type { TTestable } from '@/spec'

// import Img from '@/Img'
// import { theme } from '@/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  /* line-break: anywhere;
  word-wrap: break-word; */
  width: auto;
`

export const Title = styled.div``
