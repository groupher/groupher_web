import styled from 'styled-components'

import type { TActive, TPrimaryColor } from '@/spec'
import css, { rainbow, theme } from '@/css'

import ArrowUpRight from '@/icons/ArrowUpRight'

import { Wrapper as WrapperBase, LinkItem as LinkItemBase, ArrowIcon as ArrowIconBase } from '.'

export { MenuPanel } from '.'

export const Wrapper = styled(WrapperBase)`
  gap: 0 26px;
`
export const LinkItem = styled(LinkItemBase)`
  ${css.row('align-center')};
  font-size: 14px;
`
export const GroupItem = styled(LinkItem)<TActive>`
  ${css.row('align-center')};
  position: relative;
  padding-right: 22px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  background: ${({ $active }) => ($active ? theme('hoverBg') : '')};

  &:hover {
    background: ${theme('hoverBg')};
  }
`

export const LinkIcon = styled(ArrowUpRight)<TPrimaryColor>`
  ${css.size(14)};
  margin-right: 5px;
  fill: ${theme('article.digest')};

  ${LinkItem}:hover & {
    fill: ${({ primaryColor }) => rainbow(primaryColor)};
  }
`

export const ArrowIcon = styled(ArrowIconBase)`
  position: absolute;
  ${css.size(14)};
  right: 4px;
`
