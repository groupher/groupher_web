import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

import { HighlightWord } from '..'

export { FeatList } from '..'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-start')};
  margin-right: 10px;

  *::selection {
    background-color: ${theme('rainbow.purple')} !important;
    color: white;
  }
`
export const Digest = styled.div`
  color: ${theme('hint')};
  opacity: 0.9;
  line-height: 28px;
  width: 300px;
  margin-top: -40px;
  margin-bottom: 30px;
  font-size: 18px;
`
export const Highlight = styled(HighlightWord)`
  color: ${theme('rainbow.purple')};
`
