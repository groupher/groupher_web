import Img from '~/Img'
import styled, { css, theme } from '~/css'

import { WithPosition } from '~/widgets/Common'

export const Wrapper = styled.div`
  margin-top: 40px;
  position: relative;
`

export const CardWrapper = styled(WithPosition)`
  ${css.row('align-center')};
  gap: 0 10px;
  border: 1px solid;
  border-color: ${theme('divider')};
  background: ${theme('htmlBg')};
  padding: 2px 8px;
  height: 42px;
  border-radius: 10px;
  width: auto;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`
export const Avatar = styled(Img)`
  ${css.size(25)};
  border-radius: 5px;
  opacity: 0.8;
`
export const Say = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  word-break: keep-all;
`
