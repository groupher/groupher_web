import styled from 'styled-components'
import Link from 'next/link'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  margin-bottom: 16px;
`
export const Folder = styled.div`
  ${css.row('align-center', 'justify-between')};
  cursor: pointer;
`
export const IconWrapper = styled.div`
  ${css.size(18)};
  ${css.row('align-both')};
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
  font-size: 13px;
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
  margin-top: 8px;

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
  background: ${({ $active }) => ($active ? theme('activeLinear') : 'transparent')};

  width: 160px;
  padding: 6px 5px;
  padding-left: 20px;
  border-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 13.5px;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
    background: ${theme('activeLinear')};
  }

  &:before {
    content: '';
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    position: absolute;
    top: 10px;
    left: -2px;
    width: 4px;
    height: 13px;
    border-radius: 8px;
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
