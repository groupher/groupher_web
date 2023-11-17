import styled from 'styled-components'

import type { TActive, TColorName, TTestable } from '@/spec'
import css, { theme, rainbow, rainbowLink, rainbowLight } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
`
type TUpvoteIcon = { color: TColorName } & TActive
export const Button = styled.div<TUpvoteIcon>`
  ${css.row('align-both')};

  border: 1px solid;
  border-color: ${({ $active, color }) =>
    $active ? rainbowLink(color, 'blackActive') : theme('button.upvoteBorder')};
  background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};

  border-radius: 14px;
  width: 172px;
  padding: 10px 0;

  &:hover {
    border-color: ${({ color }) => rainbowLink(color, 'blackActive')};
    background-color: ${({ color }) => rainbowLight(color)};

    cursor: pointer;
  }

  &:hover svg {
    fill: ${({ color }) => rainbow(color)};
    transform: scale(1.1);
  }

  transition: 0.2s all;
`
export const CountWrapper = styled.div`
  margin-left: 8px;
  margin-top: 1px;
`

export const Alias = styled.div<TUpvoteIcon>`
  font-size: 15px;
  color: ${({ color, $active }) => ($active ? rainbow(color) : theme('article.digest'))};
  margin-left: 5px;
  font-weight: 400;
  margin-top: 1px;
  filter: brightness(1.2);
`
