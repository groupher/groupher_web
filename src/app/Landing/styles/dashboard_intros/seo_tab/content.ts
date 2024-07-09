import styled, { css, theme, animate } from '~/css'

import EditSVG from '~/icons/Spider'

export const Wrapper = styled.div`
  ${css.row()};
  margin-top: 300px;
  width: 100%;
  height: 235px;
  border-radius: 15px;
  padding: 10px 18px;
  padding-top: 40px;
  position: relative;
  background: #f1f1f163;
`
export const IconBox = styled.div`
  ${css.circle(35)};
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${theme('divider')};
  position: absolute;
  top: 100px;
  left: 196px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px -1px 24px;
  background: ${theme('gradientBg.cyan')};
  animation: ${animate.jump} 3s linear infinite alternate;

  &:after {
    content: '';
    position: absolute;
    left: 16px;
    top: -100px;
    height: 100px;
    width: 1px;
    background: ${theme('hint')};
    opacity: 0.35;
  }
`
export const SpiderIcon = styled(EditSVG)`
  ${css.size(20)};
  fill: ${theme('rainbow.cyan')};
  transform: rotate(180deg);
  opacity: 0.6;
`
export const OgPanel = styled.div`
  width: 50%;
  padding-left: 10px;
  position: relative;
`
export const TwPanel = styled.div`
  width: 50%;
  padding-left: 60px;
  position: relative;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  font-weight: 550;
`
export const Desc = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  font-weight: 400;
  margin-bottom: 10px;
`
