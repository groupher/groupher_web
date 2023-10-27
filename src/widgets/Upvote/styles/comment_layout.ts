import styled from 'styled-components'

import type { TTestable, TColorName, TActive } from '@/spec'
import css, { theme, rainbow, rainbowLight, rainbowLink } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.row('align-center')};
`
type TUpvote = { color: TColorName } & TActive

export const Button = styled.div<TUpvote>`
  ${css.row('align-center')};
  border: 1px solid;

  border-color: ${({ $active, color }) =>
    $active ? rainbowLink(color, 'blackActive') : theme('button.upvoteBorder')};
  background-color: ${({ $active, color }) => ($active ? rainbowLight(color) : 'transparent')};

  border-radius: 10px;
  padding: 0 2px;
  padding-right: 5px;

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
export const UpWrapper = styled.div`
  margin-left: 5px;
  margin-top: 5px;
`
export const Alias = styled.div<TUpvote>`
  color: ${({ color, $active }) => ($active ? rainbow(color) : theme('article.digest'))};
  margin-top: 1px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 5px;
  word-break: keep-all;
`
export const CountWrapper = styled.div`
  margin-left: 1px;
  margin-right: 3px;
`
