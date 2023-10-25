import styled from 'styled-components'

import type { TActive, TColorName, TTestable } from '@/spec'
import css, { theme, rainbowLink, rainbowLight } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-both')};
`

type TButton = TActive & { color: TColorName }
export const Button = styled.div<TButton>`
  ${css.column('align-both')};
  border: 1px solid;
  border-color: ${theme('button.upvoteBorder')};

  border-color: ${({ $active, color }) =>
    $active ? rainbowLink(color) : theme('button.upvoteBorder')};

  background-color: ${({ $active, color }) => ($active ? rainbowLight(color) : 'transparent')};

  border-radius: 6px;
  padding: 0 8px;
  padding-top: 4px;
  padding-bottom: 7px;

  &:hover {
    border-color: ${({ color }) => rainbowLink(color)};
    background-color: ${({ color }) => rainbowLight(color)};
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
