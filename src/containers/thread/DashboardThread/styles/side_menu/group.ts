import Link from 'next/link'

import type { TActive, TColor } from '~/spec'
import styled, { css, theme, rainbow } from '~/css'

import ArrowSVG from '~/icons/ArrowSimple'

export const Wrapper = styled.div`
  margin-bottom: 16px;
`
export const Folder = styled.div`
  ${css.row('align-center', 'justify-between')};
  cursor: pointer;
  margin-bottom: 12px;
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
  color: ${theme('dashboard.menuCat')};
  font-size: 14px;
  margin-left: 10px;
  margin-top: -1px;
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
    0.48turn,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
type TItem = TActive & TColor

export const Item = styled(Link)<TItem>`
  text-decoration: none;
  position: relative;
  display: block;
  color: ${({ $active, $color }) =>
    $active ? rainbow($color, 'dashboard.menuTitle') : theme('dashboard.menuTitle')};
  background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  width: 160px;
  padding: 3px 5px;
  margin-top: ${({ $active }) => ($active ? '7px' : '5px')};
  margin-bottom: ${({ $active }) => ($active ? '7px' : 0)};

  padding-left: 20px;
  border-radius: 10px;
  font-size: 13.5px;

  &:hover {
    cursor: pointer;
    color: ${({ $color }) => rainbow($color, 'dashboard.menuTitle')};
    background: ${theme('hoverBg')};
  }

  &:before {
    content: '';
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    position: absolute;
    top: 8px;
    left: -3px;
    width: 4px;
    height: 12px;
    border-radius: 8px;
    background: ${({ $color }) => rainbow($color)};
  }

  transition: all 0.2s;
`
