import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

import { HighlightWord } from '..'

export { FeatList } from '..'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-start')};
  margin-top: 30px;
  margin-right: 50px;
`
export const Digest = styled.div`
  color: ${theme('article.digest')};
  line-height: 1.78em;
  width: 300px;
  margin-top: -100px;
  margin-bottom: 30px;
  font-size: 19px;
`
export const Highlight = styled(HighlightWord)`
  color: ${theme('rainbow.red')};
`
