import ArchSVG from '~/icons/Arch'
import RotateSVG from '~/icons/Rotate'
import ShadowSVG from '~/icons/Shadow'
import BlocksSVG from '~/icons/Blocks'
import LightSVG from '~/icons/FlashLight'
import RatioSVG from '~/icons/Ratio'
import SizeSVG from '~/icons/ImageSize'

import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  gap: 0 3px;
  width: 276px;
  height: 38px;
  border-radius: 5px;
  background: ${theme('alphaBg')};
  margin-top: -14px;
  z-index: 10;
  box-shadow: rgb(108 108 108 / 16%) 0px 3px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`
export const Item = styled.div`
  background: ${theme('htmlBg')};
  ${css.size(30)};
  ${css.column('align-both')};
  padding: 2px;
  padding-top: 3px;
  border-radius: 4px;
`
export const Title = styled.div`
  font-size: 9px;
  color: ${theme('hint')};
  margin-top: 3px;
`
export const ColorBall = styled.div`
  ${css.circle(10)};
  margin-top: -2px;
  background: ${theme('rainbow.redSoft')};
`
// icons
const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(12)};
    fill: ${theme('article.digest')};
  `
}
export const Icon = {
  Arch: commonIcon(ArchSVG),
  Rotate: commonIcon(RotateSVG),
  Ratio: commonIcon(RatioSVG),
  Shadow: commonIcon(ShadowSVG),
  Size: commonIcon(SizeSVG),
  Position: commonIcon(BlocksSVG),
  Light: commonIcon(LightSVG),
}
