import type { TSpace } from '@/spec'
import styled, { css } from '@/css'

import { getUlMarginRight } from './metric'

export { AvatarFallback } from './real_avatar'

type TWrapper = { $total: number } & TSpace

export const Wrapper = styled('ul').withConfig({
  shouldForwardProp: (props) => props !== 'useIntersectionObserver' && props !== 'scrollPosition',
})<TWrapper>`
  ${css.row('align-center')};
  flex-direction: row-reverse;
  list-style-type: none;
  margin: auto;
  padding: 0px 8px 0px 0px;
  ${(props) => css.spaceMargins(props)};

  margin-right: ${({ $total }) => getUlMarginRight($total)};
`
export const AvatarsWrapper = styled.div`
  ${css.row()}
`
export const TotalOneOffset = styled.span`
  margin-right: 10px;
`
