import styled from 'styled-components'
import Link from 'next/link'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

export const Folder = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 13px;
`

export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-left: 12px;
  font-weight: 500;
`

export const Item = styled(Link)<TActive>`
  text-decoration: none;
  position: relative;
  display: block;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  background: ${({ $active }) => ($active ? theme('menuActive') : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  width: 116px;
  padding: 2px 5px;
  padding-left: 30px;
  margin-left: -2px;
  border-radius: 8px;
  font-size: 14px;

  margin-top: ${({ $active }) => ($active ? '4px' : '2px')};
  margin-bottom: ${({ $active }) => ($active ? '8px' : '6px')};

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
    background: ${({ $active }) => ($active ? theme('menuActive') : theme('hoverBg'))};
  }

  &:before {
    content: '';
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    position: absolute;
    top: 5px;
    left: 0px;
    width: 3px;
    height: 15px;
    border-radius: 5px;
    background: ${theme('article.digest')};
  }

  transition: all 0.2s;
`
export const TouchedDot = styled.div`
  ${css.circle(5)};
  background-color: ${theme('article.digest')};
  opacity: 0.5;
  position: absolute;
  top: 10px;
  right: 12px;
`
