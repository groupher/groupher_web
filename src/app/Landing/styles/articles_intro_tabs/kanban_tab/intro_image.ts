import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-end')};
  margin-bottom: 42px;
  width: 840px;
  height: 430px;
  background: ${theme('htmlBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  box-shadow: rgb(97 97 97 / 10%) 1px 2px 29px 0px;
`

export const holder = 1
