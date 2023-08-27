import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center')};
`
export const UpvoteBtnWrapper = styled.div`
  transform: scale(0.8);
  margin-top: 6px;
`

export const CountWrapper = styled.div`
  margin-left: -1px;
`
