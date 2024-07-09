import styled, { css, theme, animate } from '~/css'

import PlugSVG from '~/icons/Plug'
import PointSVG from '~/icons/PointDuo'

export const Main = styled.div`
  width: 325px;
  text-align: center;
  font-size: 18px;
  color: ${theme('article.digest')};
  line-height: 30px;
  margin-bottom: 40px;
`
export const Topping = styled.div`
  ${css.row('align-both')};
  width: auto;
  height: 28px;
  padding: 0 10px;
  border: 1px solid;
  border-color: ${theme('divider')};
  color: ${theme('article.digest')};
  border-radius: 20px;
  margin-bottom: 15px;
`
export const PlugIcon = styled(PlugSVG)`
  ${css.size(18)};
  fill: ${theme('article.digest')};
  margin-right: 8px;
  margin-top: 1px;
  animation: ${animate.breath} 0.8s linear infinite alternate;
`

export const PoinstIcon = styled(PointSVG)`
  ${css.size(24)};
  margin-bottom: -7px;
  display: inline-block;
  fill: #f0a156; 
  transform: rotateZ(180deg) rotateY(180deg);
`
