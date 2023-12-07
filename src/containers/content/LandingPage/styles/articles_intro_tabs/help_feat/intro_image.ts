import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.columnGrow('align-both')};
  position: relative;

  ${css.media.mobile`
    transform: scale(0.52);
    margin-top: -50px;
  `};
`
export const holder = 1
