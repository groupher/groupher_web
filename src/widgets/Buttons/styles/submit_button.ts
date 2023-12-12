import styled, { css, theme, animate } from '@/css'
import CheckedSVG from '@/icons/Checked'

export const Wrapper = styled.div``

export const PublishFooter = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  padding-left: 26px;
  padding-right: 35px;
`
export const DonwWrapper = styled.div`
  ${css.row('align-center')};
  animation: ${animate.zoomIn} 0.3s linear;
`
export const DoneIcon = styled(CheckedSVG)`
  ${css.size(16)};
  fill: ${theme('rainbow.green')};
  margin-right: 6px;
`
export const DoneHint = styled.div`
  color: ${theme('rainbow.green')};
  font-size: 14px;
`
