import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/utils/css'

type TInnerWrapper = {
  testid: string
}

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TInnerWrapper>`
  ${css.flexColumn('align-both')};
  margin-left: -6px;
  margin-bottom: -2px;
`
export const UpWrapper = styled.div`
  ${css.flex('align-both')};
  width: 30px;
  padding-left: 3px;
  transform: scale(0.9);
`
export const CountWrapper = styled.div`
  min-width: 18px;
  text-align: center;
  width: 28px;
  margin-top: 3px;
  margin-left: -1px;
`
