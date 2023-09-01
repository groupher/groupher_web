import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import { Wrapper as WrapperBase, LinkItem as LinkItemBase, ArrowIcon as ArrowIconBase } from '.'

export { MenuPanel } from '.'

export const Wrapper = styled(WrapperBase)`
  gap: 0 32px;
`
export const LinkItem = styled(LinkItemBase)`
  font-size: 14px;
`

export const GroupItem = styled(LinkItem)<TActive>`
  ${css.row('align-center')};
  position: relative;
  margin-right: 5px;
  background: ${({ $active }) => ($active ? theme('hoverBg') : theme(''))};

  &:hover {
    background: ${theme('hoverBg')};
  }
`
export const ArrowIcon = styled(ArrowIconBase)`
  ${css.size(14)};
  position: absolute;
  right: -12px;
`
