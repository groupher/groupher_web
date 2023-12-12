import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

export { FeatList } from '..'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-start')};
  margin-right: 50px;

  *::selection {
    background-color: ${theme('rainbow.orange')} !important;
    color: white;
  }
`
export const Digest = styled.div`
  color: ${theme('hint')};
  opacity: 0.9;
  line-height: 28px;
  width: 300px;
  margin-top: -100px;
  margin-bottom: 30px;
  font-size: 16px;
`
export const Hightlight = styled.span`
  color: ${theme('rainbow.red')};
  font-weight: 500;
`
