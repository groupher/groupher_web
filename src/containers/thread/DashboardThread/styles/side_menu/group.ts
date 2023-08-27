import styled from 'styled-components'
import Link from 'next/link'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  margin-bottom: 20px;
`

export const Folder = styled.div`
  ${css.flex('align-center', 'justify-between')};
  cursor: pointer;
`
export const IconWrapper = styled.div`
  ${css.size(18)};
  ${css.flex('align-both')};
  margin-left: -1px;
`
export const FoldArrowIcon = styled(ArrowSVG)<{ fold: boolean }>`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  opacity: 0.65;
  transform: ${({ fold }) => (!fold ? 'rotate(270deg)' : 'rotate(180deg)')};

  ${Folder}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  margin-left: 10px;
  font-weight: 500;
  flex-grow: 1;

  ${Folder}:hover & {
    color: ${theme('article.digest')};
  }
  transition: all 0.2s;
`
export const MenuWrapper = styled.div`
  margin-left: 7px;
  margin-top: 12px;
  padding-bottom: 5px;

  border-left: 1px solid transparent;
  border-image: linear-gradient(
    0.55turn,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const Item = styled(Link)<TActive>`
  text-decoration: none;
  position: relative;
  display: block;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  background: ${({ $active }) => ($active ? theme('menuActive') : 'transparent')};
  width: 140px;
  padding: 2px 5px;
  padding-left: 18px;
  margin-left: 0;
  border-radius: 8px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 14px;

  margin-top: ${({ $active }) => ($active ? '4px' : '3px')};
  margin-bottom: ${({ $active }) => ($active ? '8px' : '7px')};

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
    background: ${({ $active }) => ($active ? theme('menuActive') : theme('hoverBg'))};
  }

  &:before {
    content: '';
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    position: absolute;
    top: 7px;
    left: -2px;
    width: 3px;
    height: 13px;
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
