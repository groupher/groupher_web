import styled from 'styled-components'

import type { TTestable } from '@/spec'
import { theme } from '@/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  padding: 20px 30px;
  //
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  margin-top: 3px;
  opacity: 0.8;
  font-size: 13px;
`
