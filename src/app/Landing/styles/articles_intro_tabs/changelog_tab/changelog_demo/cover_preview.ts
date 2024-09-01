import styled, { css, theme } from '~/css'

import BlocksSolidSVG from '~/icons/BlocksSolid'

export const Wrapper = styled.div`
  ${css.column()};
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${theme('htmlBg')};
  width: 180px;
  height: 80px;
  box-shadow: rgb(201 201 201 / 30%) 0px 1px 10px 0px, rgb(199 199 199 / 15%) 0px 2px 6px 2px;
  border-top-left-radius: 6px;
  padding: 5px;
`
export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 15px;
  margin-left: 3px;
`
export const Dot = styled.div`
  ${css.circle(5)};
  background: ${theme('hint')};
  opacity: 0.3;
  margin-left: 5px;
`
export const BlocksWrapper = styled.div`
  ${css.row('align-center')};
`
export const BlocksSolidIcon = styled(BlocksSolidSVG)`
  ${css.size(40)};
  fill: ${theme('hint')};
  opacity: 0.1;
  margin-left: 5px;
`
