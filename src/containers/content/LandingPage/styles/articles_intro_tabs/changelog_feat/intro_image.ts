import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import css, { theme } from '@/css'

import EmojiSVG from '@/icons/EmojiTada'
import BroadcastSVG from '@/icons/Broadcast'
import CommentSVG from '@/icons/Heart'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  position: relative;
`
export const ImageWrapper = styled.div`
  width: 580px;
  height: 400px;
  z-index: 2;
  background: ${theme('htmlBg')};
  padding: 5px;
  border-radius: 10px;
  border: 1px dotted;
  border-color: ${theme('divider')};
  box-shadow: rgba(100, 100, 111, 0.1) 1px 2px 29px 0px;
`

export const ColorBlock = styled.div<TActive>`
  position: absolute;
  top: -400px;
  left: 0;
  width: 600px;
  height: 390px;

  background: linear-gradient(137deg, rgb(253 223 222) 52%, rgb(252 242 223) 100%);
  border-radius: 20px;
  /* transform: rotate(-4deg); */
  transform: rotate(4deg);

  /* box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')}; */

  ${css.media.mobile`
    left: 0;
    top: 0;
  `};
`
export const ColorBlockHolder = styled(ColorBlock)`
  left: 0px;
  top: 0;
  opacity: 0.3;
`
