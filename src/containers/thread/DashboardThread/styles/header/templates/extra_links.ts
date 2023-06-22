import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ArrowSVG from '@/icons/ArrowSimple'

import { LinkItem } from './center'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 14px;
`
export const LinkItemWrapper = styled(LinkItem)``
export const GroupItem = styled(LinkItem)`
  ${css.flex('align-center')};
  min-width: 50px;
`

export const ColumnWrapper = styled.div``

export const MenuPanel = styled.div`
  width: 80px;
  padding: 4px 5px;
`

export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: 3px;
  transform: rotate(-90deg);
`
