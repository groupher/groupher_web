import Img from '@/Img'
import styled, { css, theme } from '@/css'

import { Tail as TailBase } from '.'

export const Wrapper = styled.div`
  cursor: pointer;
  ${css.size(36)};
  position: relative;
`
export const Avatar = styled(Img)`
  ${css.circle(36)};
  fill: ${theme('article.title')};
  opacity: ${theme('avatar.opacity')};
`
export const Tail = styled(TailBase)`
  ${Wrapper}:hover & {
    left: -6px;
    transform: rotate(-18deg);
  }
`
