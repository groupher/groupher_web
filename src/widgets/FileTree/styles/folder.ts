import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div``
export const Header = styled.div<TActive>`
  ${css.row('align-center')};
  display: ${({ show }) => (show ? 'flex' : 'none')};
  margin-bottom: 8px;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`
export const ArrowIcon = styled(ArrowSVG)<{ $isOpen: boolean }>`
  fill: ${theme('tags.text')};
  ${css.size(15)};
  opacity: 0.6;
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

export const ArrowHintIcon = styled(ArrowSVG)`
  ${css.size(15)};
  opacity: 0;
  transform: rotate(270deg);

  ${Header}:hover & {
    opacity: 0.8;
  }
  transition: transform 0.2s;
`
export const Title = styled.div`
  ${css.row('align-center')};
  font-weight: 600;
  margin-bottom: 5px;
`
export const FolderTitle = styled.div<{ $isOpen: boolean }>`
  /* color: ${({ $isOpen }) => (!$isOpen ? theme('article.digest') : theme('lightText'))}; */
  color: ${theme('article.title')};
  font-size: 14px;
  margin-right: 8px;
  ${css.cutRest('85px')};

  ${Header}:hover & {
    color: ${theme('article.digest')};
  }
`

export const Content = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  width: 100%;
  margin-bottom: 32px;
  margin-left: -5px;
`
export const SubToggle = styled.div`
  ${css.row('align-center')};
  margin-top: 5px;
  margin-left: 3px;

  &:hover {
    cursor: pointer;
  }
`
export const SubToggleTitle = styled.div`
  color: ${theme('lightText')};
  font-size: 12px;
  margin-left: 11px;
  padding: 2px;
  border-radius: 5px;

  &:hover {
    color: ${theme('article.digest')};
  }

  transition: color 0.2s;
`
