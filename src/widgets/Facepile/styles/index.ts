import styled from 'styled-components'

import css from '@/css'

import { getUlMarginRight } from './metric'

export { AvatarFallback } from './real_avatar'

export const Wrapper = styled.ul<{ total: number }>`
  ${css.flex('align-center')};
  flex-direction: row-reverse;
  list-style-type: none;
  margin: auto;
  padding: 0px 8px 0px 0px;
  margin-right: ${({ total }) => getUlMarginRight(total)};
`
export const AvatarsWrapper = styled.div`
  ${css.flex()}
`
export const TotalOneOffset = styled.span`
  margin-right: 10px;
`
