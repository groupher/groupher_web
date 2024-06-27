import Img from '~/Img'
import styled, { css, theme, animate } from '~/css'

export const Wrapper = styled.div`
  ${css.row()};
`
export const ErrorIcon = styled(Img)`
  fill: ${theme('rainbow.red')};
  ${css.size(40)};
  margin-right: 15px;
  animation: ${animate.breath} 1.5s linear infinite;
`
export const Info = styled.div`
  ${css.column()};
`
// color: ${theme('article.title')};
export const Title = styled.div`
  color: ${theme('rainbow.red')};
`
// color: ${theme('article.digest')};
export const Desc = styled.div`
  color: ${theme('rainbow.red')};
`
