import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  width: 100%;
  height: 480px;
`
export const ScrollWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  overflow-y: scroll;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
`
