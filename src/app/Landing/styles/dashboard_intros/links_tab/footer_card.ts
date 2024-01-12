import styled, { css, theme } from '@/css'

import XSVG from '@/icons/X'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 16px;
  padding-top: 12px;
  padding-bottom: 0;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 445px;
  height: 150px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px -1px 24px;
  z-index: 2;
  position: absolute;
  bottom: 8px;
  left: 8px;
`
export const Card = styled.div`
  ${css.row('align-center')};
  width: 100%;
  border-radius: 14px;
  height: 100px;
  border: 1px solid;
  border-color: ${theme('divider')};
  overflow: hidden;
`
export const XIcon = styled(XSVG)`
  ${css.size(40)};
  fill: ${theme('hint')};
`
export const Cover = styled.div`
  ${css.size(100)};
  ${css.row('align-both')};
  min-widtH: 100px;
  background: ${theme('hoverBg')};
  border-right: 1px solid;
  border-right-color: ${theme('divider')};
`
export const Content = styled.div`
  margin-left: 10px;
`
export const Url = styled.div`
  color: rgb(83, 100, 113);
  font-size: 13px;
`
export const Title = styled.div`
  color: rgb(15, 20, 25);
  font-size: 14px;
  margin-bottom: 2px;
`
