import styled, { css, theme } from '~/css'

import Input from '~/widgets/Input'

export const Wrapper = styled.div`
  ${css.row('align-center')}
  margin-left: -10px;
`
export const Inputer = styled(Input)`
  width: 132px;
  height: 26px;
  font-size: 13px;
  background: ${theme('alphaBg')};

  ::placeholder {
    color: ${theme('article.digest')};
    opacity: 0.8;
  }
`
