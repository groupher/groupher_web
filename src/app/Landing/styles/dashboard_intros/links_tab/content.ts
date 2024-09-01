import styled, { css, theme } from '~/css'

import EditSVG from '~/icons/EditPen'
import { WithPosition } from '~/widgets/Common'

export { Icon } from './footer_card'

export const Wrapper = styled.div`
  ${css.row()};
  margin-top: 88px;
  width: 100%;
  height: 180px;
  padding: 10px 18px;
  position: relative;
`
export const EditBox = styled.div`
  ${css.circle(35)};
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${theme('divider')};
  position: absolute;
  top: 120px;
  left: 206px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px -1px 24px;
  background: ${theme('gradientBg.orange')};
`
export const EditIcon = styled(EditSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
`
export const OgPanel = styled.div`
  width: 50%;
  padding-left: 10px;
  position: relative;
`
export const TwPanel = styled.div`
  width: 55%;
  padding-left: 68px;
  position: relative;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  margin-bottom: 4px;
`
export const Desc = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  opacity: 0.9;
  font-weight: 400;
  margin-bottom: 10px;
`
export const Logo = styled.div`
  ${css.size(35)};
  background: ${theme('gradientBg.orange')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
  margin-top: 6px;
  margin-bottom: 10px;
`
export const LinkDesc = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  opacity: 0.9;
  font-weight: 400;
  margin-top: 3px;
`
export const IconBox = styled(WithPosition)`
  ${css.size(25)};
  ${css.row('align-both')};
`
