import styled from 'styled-components'

import type { TTestable, TActive, TColorName } from '@/spec'
import css, { rainbow, rainbowLink, theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
`
type TButton = TActive & { color: TColorName }
export const Button = styled.div<TButton>`
  ${css.row('align-center')};
  height: 22px;
  margin-left: ${({ $active }) => ($active ? 0 : '-8px')};

  border: 1px solid transparent;
  /* border: ${({ $active }) => ($active ? '1px dotted' : '1px solid')};
  border-color: ${({ $active, color }) =>
    $active ? rainbowLink(color, 'blackActive') : 'transparent'}; */

  background-color: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};

  border-radius: 6px;
  padding: 0 8px;
  padding-left: 6px;

  &:hover {
    margin-left: 0;
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
export const UpvoteBtnWrapper = styled.div`
  ${css.row('align-both')};
  margin-top: 1px;
  transform: scale(0.8);
`
export const DescWrapper = styled.div`
  ${css.row('align-center')};
  margin-left: 2px;
`
export const Text = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;
  margin-top: 1px;
`
export const Count = styled.div<{ noOne: boolean }>`
  color: ${theme('article.info')};
  font-weight: ${({ noOne }) => (noOne ? 400 : 600)};
`
