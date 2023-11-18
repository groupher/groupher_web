import styled from 'styled-components'

import type { TTestable, TColorName, TActive } from '@/spec'
import css, { theme, rainbow, rainbowLight } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
`
type TUpvote = { color: TColorName } & TActive

export const Button = styled.div<TUpvote>`
  ${css.row('align-center')};

  border: 1px solid transparent;
  border-color: ${({ $active, color }) =>
    $active ? rainbowLight(color) : theme('button.upvoteBorder')};

  background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};

  border-radius: 10px;
  padding: 0 2px;
  padding-right: 5px;

  &:hover {
    border-color: ${theme('button.upvoteBorder')};
    background: ${theme('alphaBg2')};
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
export const UpWrapper = styled.div`
  margin-left: 5px;
  margin-top: 5px;
`
export const Alias = styled.div<TUpvote>`
  color: ${({ color, $active }) => ($active ? rainbow(color) : theme('article.digest'))};
  margin-top: 1px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 5px;
  margin-left: 3px;
  word-break: keep-all;
`
export const CountWrapper = styled.div`
  margin-left: 1px;
  margin-right: 3px;
`
