import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-bottom: 16px;
  padding: 15px;
  padding-left: 30px;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  background: ${theme('drawer.bg')};
`

export const LockIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(20)};
  margin-right: 10px;
  margin-top: -4px;
`

export const Message = styled.div`
  color: ${theme('article.title')};
`
