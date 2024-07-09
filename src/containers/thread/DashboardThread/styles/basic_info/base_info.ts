import styled, { css, theme } from '~/css'

import Input from '~/widgets/Input'

export const Wrapper = styled.div`
  width: 310px;
  padding-bottom: 30px;
  margin-bottom: 20px;
`
export const Desc = styled.div`
  color: ${theme('hint')};
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
`

export const Row = styled.div`
  ${css.row('align-center')};
`
export const Label = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const Inputer = styled(Input)`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 300px;
`
export const Hint = styled.div`
  font-size: 11px;
  color: ${theme('hint')};
  margin-bottom: 20px;
  line-break: anywhere;
`
