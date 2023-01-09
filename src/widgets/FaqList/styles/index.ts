import styled from 'styled-components'

import type { TSpace, TTestable } from '@/spec'

// import Img from '@/Img'
import css from '@/utils/css'

type TWrapper = TSpace & TTestable

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('align-center')};
  padding-bottom: 40px;
  width: 100%;

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`

export const Title = styled.div``
