import styled, { css, theme } from '@/css'

import FingerPrintSVG from '@/icons/FingerPrintDuo'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 20px;
  background: ${theme('alphaBg2')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 440px;
  height: 418px;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  bottom: 122px;
  left: 140px;

  &:before {
    content: '';
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    background: ${theme('gradientBg.pink')};
    position: absolute;
    top: 8px;
    left: 8px;
    opacity: 0.5;
    border-radius: 12px;
    filter: saturate(0.8);
  }
`
export const CommunityName = styled.div`
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: 500;
`
export const Desc = styled.div`
  font-size: 13px;
  color: ${theme('hint')};
`
export const FingerPrint = styled(FingerPrintSVG)`
  ${css.size(24)};
  fill: ${theme('rainbow.red')};
  opacity: 0.2;
  position: absolute;
  top: 20px;
  right: 20px;
`
