import styled from 'styled-components'

import type { TActive, TColorName, TTestable } from '@/spec'
import css, { rainbow, rainbowLight, rainbowLink, theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.row('align-center')};
`

type TButton = TActive & { color: TColorName }
export const Button = styled.div<TButton>`
  ${css.row('align-center')};
  margin-right: 20px;

  border: 1px solid transparent;
  /* border: ${({ $active }) => ($active ? '1px dotted' : '1px solid')};
  border-color: ${({ $active, color }) =>
    $active ? rainbowLink(color, 'blackActive') : theme('button.upvoteBorder')}; */

  border-color: ${({ $active, color }) =>
    $active ? rainbowLight(color) : theme('button.upvoteBorder')};

  background-color: ${({ $active, color }) => ($active ? rainbowLight(color) : 'transparent')};

  border-radius: 16px;
  padding: 12px 15px;

  &:hover {
    /* border-color: ${({ color }) => rainbowLink(color, 'blackActive')}; */
    background-color: ${({ color }) => rainbowLight(color)};
    cursor: pointer;
  }

  &:hover svg {
    fill: ${({ color }) => rainbow(color)};
    transform: scale(1.1);
  }

  ${css.media.mobile`
    padding: 0 8px;
    height: 26px;
  `};
  transition: 0.2s all;
`
export const Alias = styled.div`
  color: ${theme('article.info')};
  font-weight: 600;
  margin-right: 7px;
  margin-left: 2px;
  word-break: keep-all;

  ${css.media.mobile`
    font-weight: 500;
    margin-left: 0;
    margin-right: 5px;
    font-size: 13px;
  `}
`
export const UpvoteBtnWrapper = styled.div`
  ${css.row('align-both')};

  ${css.media.mobile`
    margin-top: 4px;
  `}
`
export const DescWrapper = styled.div`
  ${css.row('align-center')};
  margin-left: 2px;
`
export const Count = styled.div`
  margin-left: 7px;
`
export const FacesWrapper = styled.div`
  transform: scale(0.95);
  margin-top: 3px;
  margin-bottom: 2px;
`

export const Digest = styled.div`
  ${css.column('align-start')};
`
export const Note = styled.div`
  color: ${theme('lightText')};
  font-size: 12px;
  font-weight: 400;
`
export const Text = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;
  margin-top: 1px;
`
