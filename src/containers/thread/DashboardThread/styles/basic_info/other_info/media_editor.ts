import styled from 'styled-components'

import css from '@/css'

import { Label as LabelBase } from '.'

export { Desc, Inputer } from '.'

export const Wrapper = styled.div`
  width: 300px;
`
export const Label = styled(LabelBase)`
  ${css.row('align-center')};
`
