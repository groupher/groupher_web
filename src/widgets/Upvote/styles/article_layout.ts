import styled from 'styled-components'

import type { TColorName, TTestable } from '@/spec'
import UpvoteSVG from '@/icons/Upvote'
import css, { theme, rainbow, rainbowLight } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-both')};
`
export const UpvoteIcon = styled(UpvoteSVG)<{ color: TColorName }>`
  ${css.size(15)};
  fill: ${({ color }) => rainbow(color)};
  transform: scale(1, 0.8);
  filter: brightness(1.2);
`
export const Button = styled.div<{ color: TColorName }>`
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${({ color }) => rainbow(color)};
  background: ${theme('alphaBg')};

  border-radius: 14px;
  width: 172px;
  padding: 10px 0;
  padding-top: 11px;

  &:hover {
    background-color: ${({ color }) => rainbowLight(color)};
    cursor: pointer;
  }

  transition: 0.2s all;
`
export const CountWrapper = styled.div`
  margin-left: 8px;
`
export const Alias = styled.div<{ color: TColorName }>`
  font-size: 15px;
  color: ${({ color }) => rainbow(color)};
  margin-left: 5px;
  font-weight: 400;
  filter: brightness(1.2);
`
