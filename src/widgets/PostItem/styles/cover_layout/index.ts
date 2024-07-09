import styled, { css, theme } from '~/css'

export const Wrapper = styled.article`
  ${css.row()};
  position: relative;

  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 0;
  border-bottom-color: ${theme('divider')};
  margin-bottom: 5px;

  transition: all 0.2s;
`
export const Main = styled.div`
  ${css.columnGrow()};
`
export const holder = 1
