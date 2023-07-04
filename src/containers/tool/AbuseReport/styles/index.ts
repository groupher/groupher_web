import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  color: ${theme('article.digest')};
  ${css.flexColumn()};
  min-height: 320px;
`
export const ContentWrapper = styled.div``
