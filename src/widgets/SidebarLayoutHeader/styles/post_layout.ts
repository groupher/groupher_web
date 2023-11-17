import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/css'

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-left: 100px;
`

export const InnerWrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center', 'justify-between')};
`
export const MainArea = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 610px;
`
