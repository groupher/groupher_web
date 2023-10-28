import styled from 'styled-components'

import css, { theme, rainbow } from '@/css'
import type { TActive, TColor } from '@/spec'

import { Title, RejectIcon as RejectIconBase } from './filter_panel'

export { WipIcon, TodoIcon, DoneIcon } from './filter_panel'

export const Wrapper = styled.div`
  color: ${theme('article.title')};
  font-weight: 400;
`
export const Item = styled.div`
  ${css.row('align-center')};
`
type TTitle = TActive & TColor
export const StateTitle = styled(Title)<TTitle>`
  color: ${({ $active, $color }) => ($active ? rainbow($color) : theme('article.title'))};
  font-weight: 500;
  white-space: nowrap;
`
export const IconWrapper = styled.div`
  transform: scale(0.9);
  margin-right: 4px;
`
export const RejectIcon = styled(RejectIconBase)`
  fill: ${theme('rainbow.red')};
  opacity: 1;
`
