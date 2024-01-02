import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

import { HighlightWord } from '..'

export { FeatList } from '..'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-start')};
  margin-top: 40px;
  margin-right: 10px;
`
export const Digest = styled.div`
  color: ${theme('hint')};
  line-height: 1.68em;
  width: 300px;
  margin-top: -40px;
  margin-bottom: 30px;
  font-size: 18px;
`
export const Highlight = styled(HighlightWord)`
  color: ${theme('rainbow.purple')};
`
