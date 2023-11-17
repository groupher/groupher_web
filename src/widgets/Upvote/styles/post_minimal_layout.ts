import styled from 'styled-components'

import type { TActive, TColorName, TTestable } from '@/spec'
import css, { theme, rainbow, rainbowLight } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
`

type TButton = TActive & { color: TColorName }
export const Button = styled.div<TButton>`
  ${css.column('align-both')};
  width: 40px;

  border: 1px solid;
  border-color: ${({ $active, color }) =>
    $active ? rainbowLight(color) : theme('button.upvoteBorder')};
  background-color: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};

  border-radius: 6px;
  padding: 0 8px;
  padding-top: 4px;
  padding-bottom: 7px;

  &:hover {
    border-color: ${theme('divider')};
    background-color: ${theme('alphaBg2')};
    cursor: pointer;
  }

  &:hover svg {
    fill: ${({ color }) => rainbow(color)};
    transform: scale(1.1);
  }

  &:active svg {
    fill: ${({ color }) => rainbow(color)};
    transform: scale(1.8);
    margin-top: -2px;
  }

  transition: 0.2s all;
`

export const UpWrapper = styled.div``
export const CountWrapper = styled.div`
  margin-top: -2px;
`
