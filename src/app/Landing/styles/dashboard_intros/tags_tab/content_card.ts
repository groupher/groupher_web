import styled, { theme } from '~/css'

export const Wrapper = styled.div`
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  width: 420px;
  height: 460px;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  bottom: 130px;
  left: 140px;

  &:after {
    content: "";
    position: absolute;
    top: -2px;
    right: 2px;
    width: 423px;
    z-index: -1;
    height: 60%;
    border: 1px solid;
    border-color: ${theme('divider')};
    background: ${theme('htmlBg')};
    border-radius: 6px;
    transform: rotate(-2deg);
  }
`
export const InnerContent = styled.div`
  position: relative;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;
  background: ${theme('htmlBg')};
  padding: 20px 26px;
  width: 100%;
  height: 100%;
`
