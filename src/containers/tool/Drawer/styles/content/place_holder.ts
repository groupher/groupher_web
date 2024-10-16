import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  height: 100%;
`
export const SiteLogo = styled(Img)`
  margin-top: -25%;
  ${css.size(120)};
  opacity: 0.2;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 1rem;
  margin-top: 20px;
  font-weight: bold;
`
