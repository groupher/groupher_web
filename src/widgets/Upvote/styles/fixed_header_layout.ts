import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center')};
  transform: scale(0.95);
`
export const UpvoteBtnWrapper = styled.div`
  transform: scale(0.8);
  margin-top: 5px;
`
export const Count = styled.div<{ noOne: boolean }>`
  color: ${theme('article.info')};
  font-weight: ${({ noOne }) => (noOne ? 400 : 600)};
  font-size: 16px;
`
