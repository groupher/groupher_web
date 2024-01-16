import styled, { css, theme } from '@/css'

import HashTagSVG from '@/icons/HashTagBold'

export const Wrapper = styled.div`
  margin-top: 30px;
  margin-left: 5px;
`
export const Header = styled.div`
  ${css.row()};
`
export const HashTagIcon = styled(HashTagSVG)`
  ${css.circle(13)};
  fill: ${theme('rainbow.green')};
  transform: rotate(18deg);
  opacity: 0.6;
  margin-left: -1px;
  margin-top: 1px;
  margin-right: 6px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  opacity: 0.8;
  font-size: 12px;
  width: 230px;
  margin-top: 5px;
`
