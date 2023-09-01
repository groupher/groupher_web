import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-both')};
`

export const Button = styled.div`
  ${css.column('align-both')};
  border: 1px solid;
  border-color: ${theme('button.upvoteBorder')};

  border-radius: 6px;
  padding: 6px 8px;

  &:hover {
    border-color: ${theme('lightText')};
    background: ${theme('alphaBg')};
    cursor: pointer;
  }

  transition: 0.2s all;
`

export const UpWrapper = styled.div`
  transform: scale(0.85);
  margin-left: 5px;
`
export const CountWrapper = styled.div`
  margin-top: -2px;
`
