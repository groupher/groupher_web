import Link from 'next/link'
import styled from 'styled-components'

import type { TActive, TSpace } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div<TSpace>`
  ${css.flex('align-center')};
  gap: 0 32px;

  ${(props) => css.spaceMargins(props)};

  ${css.media.mobile`
    display: none;
  `};
`
export const Title = styled(Link)<TActive>`
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-size: 14px;
  opacity: ${({ $active }) => ($active ? 1 : 0.9)};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`
