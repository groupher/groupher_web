import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import SettingSVG from '@/icons/Setting'
import { WithMargin } from '@/widgets/Common'
import css, { theme } from '@/css'

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>``

export const Title = styled.div``

export const SettingIcon = styled(SettingSVG)<TActive>`
  ${css.size(15)};
  fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  cursor: pointer;

  transform: ${({ $active }) => ($active ? 'rotate(45deg);' : 'rotate(-30deg);')};

  &:hover {
    opacity: 1;
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`
