import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  position: absolute;
  bottom: 146px;
  right: -78px;
  background: ${theme('htmlBg')};
  ${css.column('align-start')};
  z-index: 10;
  width: 188px;
  height: 100px;
  padding: 10px;

  border: 1px solid;
  border-radius: 8px;
  border-color: ${theme('divider')};
  box-shadow: rgba(100, 100, 111, 0.1) 0px 3px 29px 0px;
`
export const User = styled.div`
  ${css.row('align-center')};
  margin-bottom: 10px;
`
export const Avatar = styled(Img)`
  ${css.size(18)};
  border-radius: 4px;
`
export const Nickname = styled.div`
  font-size: 13px;
  margin-left: 6px;
`
export const Comment = styled.div`
  color: ${theme('article.digest')};
`
