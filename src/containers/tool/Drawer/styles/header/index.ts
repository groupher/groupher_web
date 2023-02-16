import styled from 'styled-components'

// see example: https://codepen.io/mattbraun/pen/EywBJR
import css, { theme } from '@/utils/css'

const BaseWrapper = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 30px;
  background: ${theme('alphaBg2')};
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`
export const BottomWrapper = styled(BaseWrapper)`
  top: 10px;
  transform: rotate(180deg);
`
export const TopWrapper = styled(BaseWrapper)`
  bottom: 10px;
`
export const TextWrapper = styled.div`
  ${css.flex('align-both')};
  height: 100%;
  transform: rotate(180deg);
  font-size: 12px;
  color: ${theme('article.title')};
  font-weight: bold;
`
