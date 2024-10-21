import styled, { css, theme } from '~/css'

import FingerPrintSVG from '~/icons/FingerPrintDuo'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 20px;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 440px;
  height: 360px;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  top: 140px;
  left: 20px;
  z-index: 2;

  &:before {
    content: '';
    z-index: 0;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    background: ${theme('gradientBg.pink')};
    position: absolute;
    top: 8px;
    left: 8px;
    opacity: 0.6;
    border-radius: 12px;
  }
`
export const Bar = styled.div`
  height: 5px;
  width: 30px;
  border-radius: 3px;
  position: absolute;
  top: 22px;
  left: 202px;
  background: ${theme('rainbow.red')};
  opacity: 0.12;
`
export const FingerPrint = styled(FingerPrintSVG)`
  ${css.size(50)};
  fill: ${theme('rainbow.red')};
  opacity: 0.08;
  position: absolute;
  top: 15px;
  right: 20px;
`
