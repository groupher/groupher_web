import styled from 'styled-components'

import type { TSpace } from '@/spec'
import css, { theme } from '@/utils/css'

import BackSVG from '@/icons/Back'

export const Wrapper = styled.div<TSpace>`
  ${css.flex('align-both')};
  font-size: 12px;
  color: ${theme('article.digest')};
  font-weight: 500;

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
