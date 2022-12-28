import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 30px;
  margin-left: 30px;
`
export const holder = 1
