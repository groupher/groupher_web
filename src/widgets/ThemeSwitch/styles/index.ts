import type { TTestable } from '@/spec'

import SunSVG from '@/icons/Sun'
import MoonSVG from '@/icons/Moon'
import { WithMargin } from '@/widgets/Common'

import styled, { css, theme } from '@/css'

type TWrapper = TTestable
export const Wrapper = styled(WithMargin).attrs<TWrapper>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>``

export const Button = styled.button`
  ${css.row('align-both')};
  background: none;
  border: none;
  padding: 0;

  inline-size: 22px;
  block-size: 22px;
  aspect-ratio: 1;
  border-radius: 5px;

  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  outline-offset: 5px;

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`

export const SunIcon = styled(SunSVG)`
  ${css.size(18)};
  fill: ${theme('article.digest')};

  ${Button}:hover & {
    fill: ${theme('article.title')};
    transform: rotate(90deg);
  }
  &:active {
    transform: scale(0.7);
  }

  transition: all 0.2s;
`

export const MoonIcon = styled(MoonSVG)`
  ${css.size(18)};
  fill: ${theme('article.digest')};

  ${Button}:hover & {
    fill: ${theme('article.title')};
    transform: rotate(-180deg);
  }

  &:active {
    transform: scale(0.7);
  }

  transition: all 0.2s;
`
