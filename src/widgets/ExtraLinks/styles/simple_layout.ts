import styled from 'styled-components'

import css from '@/css'

import { Wrapper as WrapperBase, LinkItem as LinkItemBase, ArrowIcon as ArrowIconBase } from '.'

export { MenuPanel } from '.'

export const Wrapper = styled(WrapperBase)`
  gap: 0 32px;
`
export const LinkItem = styled(LinkItemBase)`
  font-size: 14px;
`

export const GroupItem = styled(LinkItem)`
  ${css.flex('align-center')};
  position: relative;
  margin-right: 5px;
`
export const ArrowIcon = styled(ArrowIconBase)`
  ${css.size(14)};
  position: absolute;
  right: -16px;
`
