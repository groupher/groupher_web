import styled, { css, animate, theme, zIndex } from '@/css'

export { SocialIcon } from './panel'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(6px);
  z-index: ${zIndex.modalLoading};
`
export const IconWrapper = styled.div`
  ${css.column('align-both')};
  margin-bottom: 20px;
  margin-top: -26px;
  position: relative;
`
export const ProviderLogo = styled.div`
  transform: scale(2);
  animation: ${animate.blinker} 1s linear infinite alternate;
`
export const SideLogo = styled.div`
  position: absolute;
  bottom: -12px;
  right: -16px;
  z-index: 2;
  box-shadow: ${theme('shadow.xl')};
`

export const Title = styled.div`
  font-size: 22px;
  color: ${theme('article.digest')};
  font-weight: 600;
`
export const ProviderName = styled.span`
  color: ${theme('article.title')};

  &:before {
    content: "[";
    color: ${theme('hint')};
    font-size: 18;
    opacity: 0.6;
    font-weight: 400;
    margin-right: 3px;
  }

  &:after {
    content: "]";
    color: ${theme('hint')};
    font-size: 18;
    opacity: 0.6;
    font-weight: 400;
    margin-left: 3px;
  }
`
export const Desc = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};
`
export const Footer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 38%;
  opacity: 0.6;
`
export const MaskCenter = styled.div`
  width: 68%;
  height: 80px;
  background: ${theme('htmlBg')};
  position: absolute;
  left: 15%;
  bottom: 75px;
  border-radius: 30px;
  opacity: 0.8;
  z-index: 2;
`
export const MaskTop = styled(MaskCenter)`
  width: 90%;
  height: 40px;
  left: 15px;
  top: 12px;
  opacity: 0.7;
`
export const MaskBottom = styled(MaskCenter)`
  width: 90%;
  height: 40px;
  left: 15px;
  bottom: 18px;
  opacity: 0.7;
`
