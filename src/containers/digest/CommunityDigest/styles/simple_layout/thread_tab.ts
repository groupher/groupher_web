import Link from 'next/link'
import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  margin-left: -10px;
`
export const Title = styled(Link)<TActive>`
  color: ${({ $active }) =>
    $active ? theme('article.title') : theme('article.digest')};
  font-size: 15px;
  opacity: ${({ $active }) => ($active ? 1 : 0.9)};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  margin-right: 35px;
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`
