import IconText from '~/widgets/IconText'

import styled, { css, theme } from '~/css'

export { Icon } from './label'

export const Wrapper = styled.div`
  ${css.column()};
  width: 240px;
  padding: 16px 10px;
  padding-left: 15px;
`
export const Header = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div`
  font-size: 16px;
  color: ${theme('article.title')};
`
export const Desc = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-top: 8px;
  margin-bottom: 8px;
`
export const Items = styled.div`
  margin-top: 10px;
  margin-bottom: 6px;
`
export const DescItem = styled(IconText)`
  margin-bottom: 3px;
  color: ${theme('article.info')};
`
export const Footer = styled.div`
  ${css.row('align-center')};
`
