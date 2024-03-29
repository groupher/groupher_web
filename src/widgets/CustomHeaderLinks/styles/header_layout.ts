import type { TActive } from '@/spec'
import styled, { css, theme } from '@/css'

import { Wrapper as WrapperBase, LinkItem as LinkItemBase, ArrowIcon as ArrowIconBase } from '.'

export { MenuPanel } from '.'

export const Wrapper = styled(WrapperBase)`
  gap: 0 16px;
`
export const LinkItem = styled(LinkItemBase)`
  font-size: 14px;
`
export const GroupItem = styled(LinkItem)<TActive>`
  ${css.row('align-center')};
  position: relative;
  padding-right: 19px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  background: ${({ $active }) => ($active ? theme('hoverBg') : '')};

  &:hover {
    background: ${theme('hoverBg')};
    color: ${theme('article.title')};
  }
`
export const ArrowIcon = styled(ArrowIconBase)`
  position: absolute;
  ${css.size(14)};
  right: 2px;
`
