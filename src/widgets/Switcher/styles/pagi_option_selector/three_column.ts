import styled, { css } from '~/css'

import { SwitchWrapper, SwitchBarBase } from './gallery_base'

export const Wrapper = styled(SwitchWrapper)`
  width: 21px;
`
export const BarRow = styled.div`
  ${css.row('justify-between')};
`
export const Bar = styled(SwitchBarBase)`
  width: 5px;
`
