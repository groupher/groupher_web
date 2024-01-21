import styled, { css, theme } from '@/css'

import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  width: 188px;
  height: 68px;
  margin-top: -20px;
  border-radius: 10px;
  position: relative;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
export const Logo = styled(Img)`
  ${css.size(36)};
  box-shadow: rgba(149, 157, 165, 0.2) 0px -1px 24px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-weight: 500;
  font-size: 20px;
  margin-left: 10px;
`
