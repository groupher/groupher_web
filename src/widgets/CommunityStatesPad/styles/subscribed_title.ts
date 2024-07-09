// import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('justify-center')}
`
export const PopoverInfo = styled.div`
  ${css.column()};
  padding: 10px;
  padding-bottom: 5px;
  width: 200px;
`
export const PopTitle = styled.div`
  color: ${theme('article.title')};
`
export const PopDesc = styled.div`
  color: ${theme('article.digest')};
  font-size: 0.8rem;
  margin-top: 4px;
`
