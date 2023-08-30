import Link from 'next/link'
import styled from 'styled-components'

import type { TActive, TSpace } from '@/spec'
import css, { theme } from '@/css'

export const NormalWrapper = styled.div<TSpace>`
  ${css.flex('align-center')};
  gap: 0 16px;

  ${(props) => css.spaceMargins(props)};

  ${css.media.mobile`
    display: none;
  `};
`
export const FloatWrapper = styled(NormalWrapper)`
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 18px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding: 5px 30px;
  padding-right: 0;
  background: ${theme('alphaBg')};
  margin-top: -4px;
  margin-left: -100px;
`

export const Title = styled(Link)<TActive>`
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-size: 14px;
  opacity: ${({ $active }) => ($active ? 1 : 0.9)};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  text-decoration: none;
  padding: 3px 10px;
  border-radius: 5px;

  &:hover {
    color: ${theme('article.title')};
    opacity: 1;
    cursor: pointer;
    background: ${theme('hoverBg')};
  }

  transition: all 0.2s;
`
