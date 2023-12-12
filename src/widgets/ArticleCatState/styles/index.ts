import type { TSpace, TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

type TWrapper = TTestable & TSpace & { $noBorder: boolean }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  border: ${({ $noBorder }) => ($noBorder ? 'none' : '1px solid')};
  border-color: ${theme('divider')};
  border-radius: 6px;

  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`
export const holder = 1
