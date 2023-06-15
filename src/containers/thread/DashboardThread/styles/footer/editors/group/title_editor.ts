import styled from 'styled-components'

import css from '@/utils/css'

import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start')};
  gap: 0 30px;
`

export const InputWrapper = styled.div`
  ${css.flex('align-start')};
`
export const Inputer = styled(Input)`
  width: 220px;
  height: 32px;
  background: transparent;

  ::placeholder {
    font-size: 12px;
  }
`