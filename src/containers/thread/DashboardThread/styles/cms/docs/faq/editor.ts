import styled, { css } from '@/css'

import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  ${css.column()};
  width: 100%;
`

export const TitleInput = styled(Input)`
  margin-bottom: 10px;
`

export const BodyInput = styled(Input)`
  line-height: 23px;
  margin-bottom: 15px;
`
