import type { TTestable } from '@/spec'
import styled, { css } from '@/css'

type TWrapper = { type: string } & TTestable

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.column('justify-between')};
  height: auto;
  position: relative;

  ${css.media.mobile`
    width: 100%;
  `};
`

export const Title = styled.div``
