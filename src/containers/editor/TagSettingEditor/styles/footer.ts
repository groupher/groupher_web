import styled, { css } from '~/css'

import Button from '~/widgets/Buttons/Button'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  margin-top: 15px;
  padding: 0 18px;
`
export const UpdateWrapper = styled.div`
  ${css.column()};
`
export const ActionButton = styled(Button)`
  width: 180px;
`
