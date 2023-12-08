import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import css, { theme } from '@/css'

type TWrapper = TActive

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.row('align-both')};
  width: 100%;
  position: relative;

  *::selection {
    background-color: ${theme('rainbow.cyan')} !important;
    color: white;
  }
`
export const Slogan = styled.div`
  ${css.column('align-both')};
`