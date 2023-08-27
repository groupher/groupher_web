import styled from 'styled-components'

import type { TSpace, TTestable } from '@/spec'
import css, { theme } from '@/css'

type TWrapper = TTestable & TSpace
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};

  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`
export const holder = 1
