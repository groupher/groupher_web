import styled from 'styled-components'

import css from '@/css'

import { Wrapper as WrapperBase, LinkItem as LinkItemBase, ArrowIcon as ArrowIconBase } from '.'

export { MenuPanel } from '.'

export const Wrapper = styled(WrapperBase)`
  gap: 0 14px;
  height: 18px;
`
export const LinkItem = styled(LinkItemBase)`
  font-size: 12px;
  line-height: 18px;
`
export const GroupItem = styled(LinkItem)`
  ${css.flex('align-center')};
  min-width: 50px;
  position: relative;
`

export const ArrowIcon = styled(ArrowIconBase)`
  ${css.size(12)};
  position: relative;
  margin-left: 3px;
`
