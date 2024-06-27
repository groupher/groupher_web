import styled, { css, theme } from '~/css'

import Img from '~/Img'

export const Wrapper = styled.div`
  ${css.column()};
  width: 180px;
  height: 160px;
  padding: 15px 25px;
  margin-top: -10px;
  border-radius: 10px;
  position: relative;
  background: ${theme('alphaBg2')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
`
export const Header = styled.div`
  ${css.row('align-center')};
`
export const Logo = styled(Img)`
  ${css.size(26)};
  box-shadow: rgba(149, 157, 165, 0.2) 0px -1px 24px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-weight: 500;
  font-size: 20px;
  margin-left: 8px;
`
