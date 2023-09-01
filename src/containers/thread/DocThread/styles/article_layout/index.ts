import styled from 'styled-components'

import css, { theme } from '@/css'

import ArrowSVG from '@/icons/ArrowSimple'
import ListSVG from '@/icons/List'

import { MainWrapper } from '..'

export const Wrapper = styled.div<{ isSidebarLayout: boolean }>`
  ${({ isSidebarLayout }) =>
    isSidebarLayout ? css.row('justify-start') : css.row('justify-center')};
  width: 100%;
  position: relative;
`
export const Header = styled.div`
  margin-bottom: 26px;
`
export const Title = styled.div`
  font-size: 26px;
  color: ${theme('article.title')};
  font-weight: 600;

  ${css.media.mobile`
    font-size: 20px;
  `};
`
type TContent = { isRightLayout?: boolean; open?: boolean; isSidebarLayout: boolean }
export const Content = styled(MainWrapper)<TContent>`
  flex-grow: 1;
  background: transparent;
  font-size: 16px;
  line-height: 1.8;
  padding-right: ${({ isRightLayout }) => (isRightLayout ? '10px' : '90px')};
  border-right: none;

  max-width: ${({ open, isSidebarLayout }) => {
    if (isSidebarLayout || !open) {
      return '700px'
    }
    return '100%'
  }};
`

export const FAQWrapper = styled.div`
  margin-left: 32px;
  margin-top: -10px;
`

type TSidebar = { isLeftLayout?: boolean; open?: boolean }
export const Sidebar = styled.div<TSidebar>`
  ${css.column()};
  width: 300px;
  color: ${theme('article.digest')};
  padding-top: 30px;

  width: ${({ isLeftLayout }) => (isLeftLayout ? '320px' : '300px')};
  padding-left: ${({ isLeftLayout }) => (isLeftLayout ? '0' : '32px')};

  max-width: ${({ open }) => (open ? 'auto' : 0)};
  max-height: ${({ open }) => (open ? 'auto' : 0)};
  visibility: ${({ open }) => (open ? 'visiable' : 'hidden')};

  border-right: 1px solid;
  border-right: 1px solid transparent;
  border-image: linear-gradient(
    0.46turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`

export const TreeWrapper = styled.div`
  margin-left: -18px;
`
export const ToggleBtn = styled.div<{ open: boolean }>`
  position: absolute;
  top: 12%;
  left: ${({ open }) => (open ? '214px' : '20px')};
  transform: ${({ open }) => (open ? '' : 'rotate(180deg)')};

  ${({ open }) => (open ? css.circle(24) : css.circle(28))};
  ${css.row('align-both')};
  background: white;
  border: 1px solid;
  border-color: ${theme('divider')};
  z-index: 2;

  &:hover {
    box-shadow: ${css.cardShadow};
    /* border-color: ${theme('article.digest')}; */
    cursor: pointer;
  }
  /* transition: all 0.2s; */
`

export const ToggleArrowIcon = styled(ArrowSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};

  ${ToggleBtn}:hover & {
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`

export const ToggleListIcon = styled(ListSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  opacity: 0.6;

  ${ToggleBtn}:hover & {
    fill: ${theme('article.title')};
    opacity: 1;
  }

  transition: all 0.2s;
`
