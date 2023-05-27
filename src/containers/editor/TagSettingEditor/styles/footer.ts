import styled from 'styled-components'

import css from '@/utils/css'

import Button from '@/widgets/Buttons/Button'

export const Wrapper = styled.div`
  ${css.flex('align-both')};
  width: 100%;
  margin-top: 15px;
  padding: 0 18px;
`
export const UpdateWrapper = styled.div`
  ${css.flexColumn()};
`
export const ActionButton = styled(Button)`
  width: 180px;
`
