import styled from 'styled-components'

import type { TTestable, TActive } from '@/spec'
import css, { theme } from '@/css'

export { getSelectStyles } from './metric'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>``

export const OptionRow = styled.div`
  ${css.row('align-end')};
`
export const OptionTitle = styled.div<TActive>`
  font-size: 14px;
  /* color: ${theme('article.title')}; */
  color: ${({ active }) => (active ? 'white' : 'transparent')};
  padding: 0 5px;
  border-radius: 3px;
`
export const OptionDesc = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-left: 15px;
`
