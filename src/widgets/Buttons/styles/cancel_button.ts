import styled from 'styled-components'

import type { TSpace } from '@/spec'
import css, { theme } from '@/css'

import BackSVG from '@/icons/Back'

export const Wrapper = styled.button<TSpace>`
  ${css.row('align-both')};
  width: auto;
  font-size: 12px;
  color: ${theme('article.digest')};
  font-weight: 500;
  background: transparent;
  border: none;

  &:hover {
    color: ${theme('article.title')};
  }

  cursor: pointer;
  transition: all 0.2s;

  ${(props) => css.spaceMargins(props)};
`

export const BackIcon = styled(BackSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 5px;
  opacity: 0.8;

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
    opacity: 1;
  }

  transition: all 0.2s;
`
