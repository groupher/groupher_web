import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
  min-height: 150px;
  margin-top: 30px;
  padding: 0;
`
export const Header = styled.div`
  ${css.flex('align-center', 'justify-between')};
  height: 50px;
  width: 100%;
  padding-left: 10px;
  padding-right: 14px;
`
