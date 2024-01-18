import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

import { HighlightWord } from '..'

export { FeatList } from '..'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-start')};
  width: 380px;
  height: 430px;

  *::selection {
    background-color: ${theme('rainbow.cyan')} !important;
    color: white;
  }
`
export const Digest = styled.div`
  color: ${theme('article.title')};
  line-height: 1.78em;
  width: 300px;
  margin-top: -40px;
  margin-bottom: 16px;
  font-size: 19px;
`
export const Highlight = styled(HighlightWord)`
  color: ${theme('rainbow.cyan')};
  opacity: 0.9;
`
