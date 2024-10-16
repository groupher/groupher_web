import type { TTestable } from '~/spec'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-start')};
  color: ${theme('article.title')};
  line-height: 24px;
  font-size: 15px;
  opacity: 0.8;
`
export const Indent = styled.div<{ errorBg: string }>`
  position: relative;
  margin-left: ${({ errorBg }) => (errorBg ? '0' : '15px')};
  background: ${({ errorBg }) => (errorBg ? '#653227' : 'transparent')};
  padding: ${({ errorBg }) => (errorBg ? '0 8px 0 15px' : '0')};
  border-radius: 5px;
`
export const KeyToken = styled.span`
  color: #3480AA; #9c8f6e;
  font-weight: bold;
`
export const StringToken = styled.span`
  color: #9c8f6e;
`
export const AtomToken = styled.span`
  color: #00959c;
`
