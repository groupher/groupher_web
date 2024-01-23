import styled, { css, theme } from '@/css'

import Img from '@/Img'
export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  padding: 0 15px;
  padding-bottom: 0;
  color: ${theme('article.digest')};
  width: 100%;
  height: 56px;
  z-index: 2;
  position: absolute;
  bottom: 25px;
  left: 0;
`
export const ImCard = styled.div`
  width: 230px;
  height: 88px;
  ${css.column('align-both')};
  background: ${theme('htmlBg')};
  gap: 8px 0px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  padding-top: 5px;
`
export const OhterCard = styled(ImCard)`
  width: 170px;
  height: 88px;
`
export const ImIcons = styled.div`
  width: 100%;
  ${css.row('align-both')};
  opacity: 0.9;
  gap: 0 12px;
`
export const ToolIcons = styled(ImIcons)`
  gap: 0 15px;
`
export const FooterNote = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-bottom: -5px;
`

export const ImgIcon = styled(Img)<{ $size?: number }>`
  ${({ $size }) => css.size($size || 28)}};
`
