import styled from 'styled-components'

import type { TActive, TColorName, TTestable } from '@/spec'
import css, { theme, rainbow, rainbowLink, rainbowLight } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-both')};
`

type TButton = TActive & { color: TColorName }
export const Button = styled.div<TButton>`
  ${css.column('align-both')};
  width: 40px;
  border: ${({ $active }) => ($active ? '1px dotted' : '1px solid')};
  border-color: ${({ $active, color }) =>
    $active ? rainbowLink(color, 'blackActive') : theme('button.upvoteBorder')};

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

  &:hover svg {
    fill: ${({ color }) => rainbow(color)};
    transform: scale(1.1);
  }

  transition: 0.2s all;
`

export const UpWrapper = styled.div``
export const CountWrapper = styled.div`
  margin-top: -2px;
`
