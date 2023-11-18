import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/css'

type TWrapper = { type: string } & TTestable

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.column('justify-between')};
  height: auto;

  ${css.media.mobile`
    width: 100%;
  `};
`
export const Title = styled.div``
