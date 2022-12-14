import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { Title, RejectIcon as RejectIconBase } from './filter_panel'

export { WipIcon, TodoIcon, DoneIcon } from './filter_panel'

export const Wrapper = styled.div`
  color: ${theme('article.title')};
  font-weight: 400;
  opacity: 0.8;
`
export const Item = styled.div`
  ${css.flex('align-center')};
`
export const StateTitle = styled(Title)`
  color: ${theme('article.title')};
  font-weight: 600;
`
export const IconWrapper = styled.div`
  margin-top: -1px;
  transform: scale(0.9);
`
export const RejectIcon = styled(RejectIconBase)`
  fill: ${theme('baseColor.red')};
  opacity: 1;
`
