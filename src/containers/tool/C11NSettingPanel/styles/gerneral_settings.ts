import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-start', 'justify-start')};
  width: auto;
  height: 100%;
  margin-top: 10px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`
export const Desc = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
  opacity: 0.5;
`
