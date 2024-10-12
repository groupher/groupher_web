import styled, { css, theme, animate } from '~/css'

import UpSVG from '~/icons/Goup'
import DownSVG from '~/icons/Godown'
import { WithPosition } from '~/widgets/Common'

export const Wrapper = styled(WithPosition)`
  ${css.row('align-center')};
  flex-wrap: wrap;
  padding: 4px 0;

  width: 150px;
  height: 100px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
  border-top-left-radius: 8px;
  border-top-right-radius: 10px;
  box-shadow: rgb(194 193 177 / 20%) 0px -3px 24px;
  background: linear-gradient(162deg,#fffaf0 0%,rgb(254 254 254 / 93%) 50%);
  z-index: 40;
`
export const Block = styled.div`
  position: relative;
  width: 50%;
  height: 40px;
  padding: 2px 10px;
`
export const Title = styled.div`
  font-size: 10px;
  color: ${theme('hint')};
  margin-left: -1px;
`
export const Num = styled.div<{ $opacity?: number }>`
  font-size: 14px;
  color: ${theme('article.title')};
  font-weight: 500;
  opacity: ${({ $opacity }) => $opacity || 1};
`
export const ArrowWrapper = styled(WithPosition)`
  ${css.size(12)};
`
export const ArrowUpIcon = styled(UpSVG)`
  ${css.size(12)};
  fill: ${theme('rainbow.green')};
  animation: ${animate.jump} 0.3s linear;
  transition: all .2s;
  opacity: 0.8;
`
export const ArrowDownIcon = styled(DownSVG)`
  ${css.size(10)};
  fill: ${theme('rainbow.red')};
  animation: ${animate.jump} 0.3s linear;
  transition: all .2s;
  opacity: 0.8;
`
