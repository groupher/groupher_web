import styled from 'styled-components'

import type { TActive, TColorName, TTestable } from '@/spec'
import UpvoteSVG from '@/icons/Upvote'
import css, { theme, rainbow, rainbowLink, rainbowLight } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-both')};
`
type TUpvoteIcon = { color: TColorName } & TActive
export const UpvoteIcon = styled(UpvoteSVG)<TUpvoteIcon>`
  ${css.size(15)};
  fill: ${({ color, $active }) => ($active ? rainbow(color) : theme('article.digest'))};
  transform: scale(1, 0.8);
  filter: brightness(1.2);
`
export const Button = styled.div<TUpvoteIcon>`
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${({ $active, color }) =>
    $active ? rainbowLink(color, 'blackActive') : theme('button.upvoteBorder')};

  background-color: ${({ $active, color }) => ($active ? rainbowLight(color) : 'transparent')};

  border-radius: 14px;
  width: 172px;
  padding: 10px 0;
  padding-top: 11px;

  &:hover {
    border-color: ${({ color }) => rainbowLink(color, 'blackActive')};
    background-color: ${({ color }) => rainbowLight(color)};

    cursor: pointer;
  }

  transition: 0.2s all;
`
export const CountWrapper = styled.div`
  margin-left: 8px;
`

export const Alias = styled.div<TUpvoteIcon>`
  font-size: 15px;
  color: ${({ color, $active }) => ($active ? rainbow(color) : theme('article.digest'))};
  margin-left: 5px;
  font-weight: 400;
  filter: brightness(1.2);
`
