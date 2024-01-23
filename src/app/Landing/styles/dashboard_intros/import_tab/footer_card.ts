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
export const Card = styled.div`
  ${css.size(88)};
  ${css.column('align-both')};
  background: ${theme('htmlBg')};
  gap: 5px 0px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  padding-top: 5px;
`
export const ImgIcon = styled(Img)`
  ${css.size(30)}};
  border-radius: 5px;
`
export const EmailIcon = styled.img`
  width: 40px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 14px;
`
