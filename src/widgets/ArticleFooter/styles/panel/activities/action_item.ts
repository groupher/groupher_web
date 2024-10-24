import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-bottom: 10px;
  cursor: pointer;
`
export const MainInfo = styled.div`
  position: relative;
  ${css.row('align-end')};
`
export const IconBgWrapper = styled.div`
  ${css.circle(18)};
  ${css.row('align-both')};
  background: ${theme('hoverBg')};
  margin-right: 10px;
`
export const ActionIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(15)};
`
const HighlightLink = styled.a`
  color: ${theme('article.title')};
  &:hover {
    color: ${theme('article.title')};
    text-decoration: underline;
    text-decoration-color: ${theme('article.digest')};
  }
`
export const ArticleTitle = styled(HighlightLink)`
  font-size: 13px;
  margin-left: 2px;
  margin-right: 4px;
`
export const AvatarIcon = styled(Img)`
  ${css.circle(13)};
  margin-bottom: 2px;
  margin-right: 10px;
`
export const UserName = styled(HighlightLink)`
  font-size: 12px;
  margin-right: 3px;
`
