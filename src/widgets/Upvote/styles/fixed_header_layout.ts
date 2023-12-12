import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
`
export const UpvoteBtnWrapper = styled.div`
  ${css.row('align-both')};
`
export const Count = styled.div<{ $noOne: boolean }>`
  color: ${theme('article.info')};
  font-weight: ${({ $noOne }) => ($noOne ? 400 : 600)};
  font-size: 16px;
`
