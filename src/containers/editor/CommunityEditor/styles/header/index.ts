import styled, { css, theme } from '~/css'

import { LineDivider } from '~/widgets/Common'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  padding: 0 10%;
  width: 100%;
  height: 78px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  font-weight: 500;
`
export const Divider = styled(LineDivider)`
  background: ${theme('lightText')};
`
export const SubTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
`
