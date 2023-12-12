// see example: https://codepen.io/mattbraun/pen/EywBJR
import styled, { css, theme } from '@/css'

import CloseButtonSVG from '@/icons/CloseLight'

const BaseWrapper = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 30px;
  background: ${theme('alphaBg2')};
  backdrop-filter: blur(3px);

  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`
export const BottomWrapper = styled(BaseWrapper)`
  top: 10px;
  transform: rotate(180deg);
`

export const CloseButton = styled(CloseButtonSVG)`
  ${css.size(18)};
  fill: ${theme('lightText')};
  position: absolute;
  left: 16px;
  top: 1px;
`

export const TopWrapper = styled(BaseWrapper)`
  bottom: 10px;
`
export const TextWrapper = styled.div`
  ${css.row('align-both')};
  height: 100%;
  transform: rotate(180deg);
  font-size: 12px;
  color: ${theme('article.title')};
  font-weight: bold;
`
