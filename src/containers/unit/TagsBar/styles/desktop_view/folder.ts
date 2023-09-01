import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import ArrowSVG from '@/icons/ArrowSimple'
import MoreSVG from '@/icons/menu/MoreL'

export const Wrapper = styled.div``
export const Header = styled.div<TActive>`
  ${css.row('align-center')};
  display: ${({ show }) => (show ? 'flex' : 'none')};
  margin-bottom: 8px;
  margin-left: 2px;
  &:hover {
    cursor: pointer;
  }
`
export const ArrowIcon = styled(ArrowSVG)<{ $isOpen: boolean }>`
  fill: ${theme('tags.text')};
  ${css.size(15)};
  opacity: 0.8;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(270deg)' : 'rotate(180deg)')};
  transition: transform 0.5s;

  ${Wrapper}:hover & {
    opacity: 0.8;
  }

  ${Header}:hover & {
    opacity: 1;
  }
  transition: all 0.2s;
`
export const Title = styled.div`
  ${css.row('align-center')};
  margin-left: 5px;
`
export const FolderTitle = styled.div<{ $isOpen: boolean }>`
  color: ${theme('article.title')};

  margin-left: 4px;
  font-size: 13px;
  margin-right: 8px;
  ${css.cutRest('85px')};

  ${Header}:hover & {
    color: ${theme('article.digest')};
  }
`
export const Count = styled.div`
  color: ${theme('article.info')};
  font-size: 13px;

  &:before {
    content: '(';
    margin-right: 2px;
    font-size: 12px;
  }
  &:after {
    content: ')';
    margin-left: 2px;
    font-size: 12px;
  }
`

export const Content = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  width: 100%;
  margin-bottom: 15px;
`
export const SubToggle = styled.div`
  ${css.row('align-center')};
  margin-top: 5px;
  margin-left: 2px;

  &:hover {
    cursor: pointer;
  }
`
export const SubToggleTitle = styled.div`
  color: ${theme('lightText')};
  font-size: 12px;
  margin-left: 8px;
  padding: 2px;
  border-radius: 5px;

  &:hover {
    color: ${theme('article.digest')};
  }

  transition: color 0.2s;
`
export const SubTogglePrefixIcon = styled(MoreSVG)`
  fill: ${theme('lightText')};
  ${css.size(11)};
  margin-left: 2px;
`
