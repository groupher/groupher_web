import styled, { css, theme } from '~/css'

import Input from '~/widgets/Input'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  width: 100%;
`
export const Inputer = styled(Input)`
  width: 660px;
  /* width: calc(100% - 20px); */
  color: ${theme('article.title')};
  display: block;
  border-radius: 0;
  border: none;
  background: transparent;
  padding-left: 12px;
  padding-bottom: 5px;
  height: 50px;
  font-size: 24px;
  line-height: 1.6;
  /* font-size: 13px; */

  &:hover {
    border: none;
  }

  &:focus {
    border: none;
    box-shadow: none;
  }

  &::placeholder {
    font-size: 24px;
    color: ${theme('article.title')};
    opacity: 0.6;
  }
`
