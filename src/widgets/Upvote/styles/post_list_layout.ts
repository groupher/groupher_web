import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
`
export const UpWrapper = styled.div`
  ${css.flex('align-both')};
  width: 26px;
  transform: scale(0.8);
  padding-left: 3px;
`
export const CountWrapper = styled.div`
  text-align: center;
  width: 24px;
  margin-top: 2px;
  margin-left: -2px;
`
