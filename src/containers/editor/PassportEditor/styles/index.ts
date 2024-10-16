import type { TTestable } from '~/spec'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.article.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  padding: 24px 30px;
  //
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  margin-top: 3px;
  opacity: 0.8;
  font-size: 13px;
`
export const Footer = styled.div`
  width: 100%;
  ${css.row('align-both')};
  padding-right: 50px;
  gap: 0 14px;
`

export const RootSign = styled.span`
  display: inline-block;
  background: ${theme('rainbow.blueSoft')};
  color: ${theme('rainbow.blue')};
  border: 1px solid;
  border-color: ${theme('rainbow.blue')};
  font-size: 12px;
  font-weight: bold;
  padding: 1px 6px;
  border-radius: 5px;
  margin-bottom: 5px;
`
