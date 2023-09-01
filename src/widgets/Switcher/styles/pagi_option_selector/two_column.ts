import styled from 'styled-components'

import css from '@/css'

import { SwitchWrapper, SwitchBarBase } from './gallery_base'

export const Wrapper = styled(SwitchWrapper)``

export const BarRow = styled.div`
  ${css.row('justify-between')};
`
export const Bar = styled(SwitchBarBase)`
  width: 8px;
`
