import styled, { css, theme, animate } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
export const LoadingIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(26)};
  animation: ${animate.rotate360} 1s linear infinite;
  margin-right: 3px;
`
export const LoadingText = styled.div`
  color: ${theme('article.title')};
  font-size: 0.9rem;
`
