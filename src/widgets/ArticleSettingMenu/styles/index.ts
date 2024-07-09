import { createGlobalStyle } from 'styled-components'
import styled, { css, theme } from '~/css'

import type { TActive, TTestable } from '~/spec'

import SettingSVG from '~/icons/Setting'
import { WithMargin } from '~/widgets/Common'

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>``

export const Title = styled.div``

export const SettingIcon = styled(SettingSVG)<TActive>`
  ${css.size(16)};
  fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  cursor: pointer;

  transform: ${({ $active }) => ($active ? 'rotate(45deg);' : 'rotate(-30deg);')};

  &:hover {
    opacity: 1;
    fill: ${theme('article.title')};
  }

  transition: fill 0.2s, opacity 0.2s, transform 0.4s ease-out;
`

export const DisableTippyJump = createGlobalStyle`
  // this is for disable pop animation
  // should have no animation when navi to sub menu
  .tippy-box[data-placement^=bottom][data-state='visible'] {
    transform: translateY(0);
  }
`
